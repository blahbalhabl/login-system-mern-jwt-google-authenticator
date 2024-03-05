const request = require('supertest');
const app = require('../server'); // Import your express app
const Users = require('../models/Users'); // Import your Users model

describe('Users Controller', () => {

  const createUserAndLogin = async () => {
    let token;
  
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      });
  
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      });
  
    token = response.body.user.token;
  
    return token;
  };

  beforeEach(async () => {
    // Clear the database before each test run
    await Users.deleteOne({email: 'testuser@example.com'});
  });

  test('should get all users', async () => {
    const token = await createUserAndLogin();

    await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('should register a user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      })
      .expect(200);

    expect(response.body.msg).toBe('User testuser created successfully!');
  });

  test('should not register a user with existing email', async () => {
    await Users.create({
      username: 'testinguser',
      email: 'testuser@example.com',
      password: 'testgpassword',
    });

    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'newuser',
        email: 'testuser@example.com',
        password: 'newpassword',
      })
      .expect(400);
  });

  test('should login a user', async () => {
    const user = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      })
      .expect(200);

    expect(response.body.msg).toBe('Login successful');
    expect(response.body.user.username).toBe('testuser');
  });

  test('should not login a user with incorrect password', async () => {
    await Users.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    });

    await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      })
      .expect(400);
  });

  test('should logout a user', async () => {
    const token = await createUserAndLogin();

    const response = await request(app)
      .get('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(response.body.msg).toBe('User not logged in!');
  });
});