import { test, expect } from '../fixtures';

test.describe('Inventory & sorting', () => {
  test('TC-INV-01: inventory lists 6 products @smoke', async ({ loggedIn }) => {
    await expect(loggedIn.items).toHaveCount(6);
  });

  test('TC-INV-02: sort by price low → high', async ({ loggedIn }) => {
    await loggedIn.sortBy('lohi');
    const prices = await loggedIn.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC-INV-03: sort by price high → low', async ({ loggedIn }) => {
    await loggedIn.sortBy('hilo');
    const prices = await loggedIn.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC-INV-04: sort by name Z → A', async ({ loggedIn }) => {
    await loggedIn.sortBy('za');
    const names = await loggedIn.itemNames.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });
});
