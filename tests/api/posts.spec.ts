import { test, expect } from '@playwright/test';

// Public fake REST API: https://jsonplaceholder.typicode.com
test.describe('API – /posts', () => {
  test('TC-API-01: GET /posts/1 returns a valid post @smoke', async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ id: 1, userId: expect.any(Number) });
    expect(typeof body.title).toBe('string');
    expect(typeof body.body).toBe('string');
  });

  test('TC-API-02: GET /posts returns 100 posts', async ({ request }) => {
    const res = await request.get('/posts');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(100);
  });

  test('TC-API-03: GET /posts?userId=1 filters by user', async ({ request }) => {
    const res = await request.get('/posts', { params: { userId: 1 } });
    const body: Array<{ userId: number }> = await res.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body.every((p) => p.userId === 1)).toBe(true);
  });

  test('TC-API-04: POST /posts creates a post', async ({ request }) => {
    const payload = { title: 'QA portfolio', body: 'Created by Playwright', userId: 1 };
    const res = await request.post('/posts', { data: payload });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toMatchObject(payload);
    expect(body.id).toBeDefined();
  });

  test('TC-API-05: GET unknown post returns 404', async ({ request }) => {
    const res = await request.get('/posts/99999');
    expect(res.status()).toBe(404);
  });
});
