import 'dotenv/config';
import { describe, beforeAll, afterAll, test, expect } from 'vitest';
import { startServer } from '../server';
import request from 'supertest';
import type { Server } from 'http';

const serverUrl = 'http://localhost:3000';

describe('Auth E2E', () => {
  test('should register and login successfully', async () => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'StrongP@ssw0rd';

    const registerRes = await request(serverUrl)
      .post('/graphql')
      .send({
        query: `mutation {
      register(input: {email: "${email}", password: "${password}"}){
      id
      email
      role
      }}`,
      });

    expect(registerRes.body.data.register.email).toBe(email);

    const loginRes = await request(serverUrl)
      .post('/graphql')
      .send({
        query: `
      mutation {
      login(input: {email: "${email}", password:"${password}"}){
      token}}`,
      });

    expect(loginRes.body.data.login.token).toBeTypeOf('string');
  });
});
