import { Page, Locator } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortSelect: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  /** "Sauce Labs Backpack" -> "add-to-cart-sauce-labs-backpack" */
  private slug(productName: string) {
    return productName.toLowerCase().replace(/\s+/g, '-');
  }

  async addToCart(productName: string) {
    await this.page.getByTestId(`add-to-cart-${this.slug(productName)}`).click();
  }

  async removeFromCart(productName: string) {
    await this.page.getByTestId(`remove-${this.slug(productName)}`).click();
  }

  async sortBy(option: SortOption) {
    await this.sortSelect.selectOption(option);
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }
}
