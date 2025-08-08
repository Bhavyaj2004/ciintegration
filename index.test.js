// index.test.js
const request = require('supertest');
const app = require('./index'); // Import your app

describe('GET /', () => {
  it('should respond with "Hello, CI/CD!"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, CI/CD!');
  });
});