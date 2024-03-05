const request = require('supertest');
const app = require('../server'); // Import your express app
const Users = require('../models/Users'); // Import your Users model

describe('Auth Controller', () => {
  let invalidToken = 'invalidtoken';
  let tokens;

  const createUserAndLogin = async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword'
      });

    const response = await request(app)
      .post('/api/auth/login')
      .send({ 
        email: 'testuser@example.com', 
        password: 'testpassword' 
      });

    const accessToken = response.body.user.token;
    const validToken = response.headers['set-cookie'].toString().split(';')[0];
    
    return { validToken, accessToken };
  };

  beforeEach(async () => {
    // Clear the database before each test run
    await Users.deleteOne({email: 'testuser@example.com'});
    tokens = await createUserAndLogin();
  });

  afterEach(async () => {
    await Users.deleteOne({email: 'testuser@example.com'});
  });

  test('should return new access token when given valid refresh token', async () => {

    const response = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', tokens.validToken)
      .expect(200);
    // TODO: this test still gets the same access token
    expect(response.body.token).not.toBe(tokens.accessToken);
    expect(response.body.user).toBeDefined();
  });

  test('should return 401 error when no refresh token is provided', async () => {
    const response = await request(app)
      .post('/api/auth/refresh')
      .expect(401);

    expect(response.body.msg).toBe('No Refresh Token Found!');
  });

  test('should return 403 error when given invalid refresh token', async () => {
    const response = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', `_refresh=${invalidToken}`)
      .expect(403);

    expect(response.body.msg).toBe('Invalid Refresh token!');
  });
});