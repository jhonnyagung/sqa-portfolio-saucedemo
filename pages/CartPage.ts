import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
