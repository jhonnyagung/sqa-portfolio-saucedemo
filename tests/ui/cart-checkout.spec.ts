import { test, expect } from '../fixtures';
import { CUSTOMER } from '../../test-data/users';

const BACKPACK = 'Sauce Labs Backpack';
const BIKE_LIGHT = 'Sauce Labs Bike Light';

test.describe('Cart', () => {
  test('TC-CART-01: adding items updates the cart badge', async ({ loggedIn }) => {
    await loggedIn.addToCart(BACKPACK);
    await expect(loggedIn.cartBadge).toHaveText('1');
    await loggedIn.addToCart(BIKE_LIGHT);
    await expect(loggedIn.cartBadge).toHaveText('2');
  });

  test('TC-CART-02: removing an item updates the cart badge', async ({ loggedIn }) => {
    await loggedIn.addToCart(BACKPACK);
    await loggedIn.removeFromCart(BACKPACK);
    await expect(loggedIn.cartBadge).toHaveCount(0);
  });

  test('TC-CART-03: cart keeps items after page reload', async ({ page, loggedIn, cartPage }) => {
    await loggedIn.addToCart(BACKPACK);
    await page.reload();
    await loggedIn.openCart();
    await expect(cartPage.itemNames).toHaveText([BACKPACK]);
  });
});

test.describe('Checkout', () => {
  test('TC-CHK-01: complete purchase end-to-end @smoke', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addToCart(BACKPACK);
    await loggedIn.addToCart(BIKE_LIGHT);
    await loggedIn.openCart();
    await expect(cartPage.itemNames).toHaveText([BACKPACK, BIKE_LIGHT]);

    await cartPage.checkout();
    await checkoutPage.fillInformation(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);

    // Item total must equal the sum of item prices
    const prices = (await checkoutPage.itemPrices.allTextContents()).map((p) => parseFloat(p.replace('$', '')));
    const expected = prices.reduce((a, b) => a + b, 0).toFixed(2);
    await expect(checkoutPage.itemTotal).toContainText(`$${expected}`);

    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toContainText(/thank you for your order/i);
  });

  test('TC-CHK-02: checkout requires first name', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addToCart(BACKPACK);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation('', CUSTOMER.lastName, CUSTOMER.postalCode);
    await expect(checkoutPage.error).toContainText('First Name is required');
  });

  test('TC-CHK-03: checkout requires postal code', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addToCart(BACKPACK);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(CUSTOMER.firstName, CUSTOMER.lastName, '');
    await expect(checkoutPage.error).toContainText('Postal Code is required');
  });
});
