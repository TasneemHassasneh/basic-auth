const request = require('supertest');
const app = require('../src/server'); // Assuming your server file is in src/server.js

describe('Authentication API', () => {
  let createdUser; // Store the created user for later use in signin test

  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ username: 'testuser', password: 'testpassword' })
        .expect(201);

      // Assert that the response contains the created user record
      expect(response.body).toHaveProperty('user');

      // Store the created user for later use in signin test
      createdUser = response.body.user;
    });
  });

  describe('POST /signin', () => {
    it('should login as a user using basic auth', async () => {
      const response = await request(app)
        .post('/signin')
        .set('Authorization', `Basic ${Buffer.from('testuser:testpassword').toString('base64')}`)
        .expect(200);

      // Assert that the response contains the user record
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toEqual(createdUser);
    });
  });

  describe('Auth Middleware', () => {
    it('should allow access with valid basic authentication', async () => {
      const response = await request(app)
        .get('/protected-route')
        .set('Authorization', `Basic ${Buffer.from('testuser:testpassword').toString('base64')}`)
        .expect(200);

      // Assert that the response contains the expected data for the protected route
      expect(response.body).toHaveProperty('data');
      // Add more assertions as per your requirements
    });

    it('should reject access without valid basic authentication', async () => {
      const response = await request(app)
        .get('/protected-route')
        .expect(401);

      // Assert that the response contains the expected error for unauthorized access
      expect(response.body).toHaveProperty('error');
      // Add more assertions as per your requirements
    });
  });
});
