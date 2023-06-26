const request = require('supertest');
const { app } = require('../src/server');
const { usersModel } = require('../src/auth/models/user-model');

describe('Authentication Routes', () => {
  beforeEach(async () => {
    // Clear the user table before each test
    await usersModel.destroy({ truncate: true });
  });

  after(async () => {
    // Close the server and disconnect from the database after all tests
    await usersModel.sequelize.close();
  });

  it('should create a new user on /signup', async () => {
    const newUser = { username: 'testuser', password: 'password' };

    const response = await request(app)
      .post('/signup')
      .send(newUser)
      .expect(201);

    expect(response.body.username).toBe(newUser.username);
    expect(response.body.password).not.toBe(newUser.password);
  });

  it('should authenticate a user on /signin', async () => {
    const username = 'testuser';
    const password = 'password';

    // Create a new user
    await usersModel.create({ username, password });

    const response = await request(app)
      .post('/signin')
      .auth(username, password)
      .expect(200);

    expect(response.body.user.username).toBe(username);
  });
});
