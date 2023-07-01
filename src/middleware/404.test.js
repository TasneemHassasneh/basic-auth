const request = require('supertest');
const app = require('./404');

describe('404 Middleware', () => {
  test('should return 404 status for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Route not found');
  });
});
