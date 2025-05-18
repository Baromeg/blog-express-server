import { describe, expect, test } from 'vitest';
import { HashService } from './hash.service';
import { UserRole } from '../models/user.model';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  const payload = { userId: 'id', role: UserRole.ADMIN };

  test('should generate a token', () => {
    const token = JwtService.generateToken(payload);

    expect(token).toBeTypeOf('string');
    expect(token.length).toBeGreaterThan(10);
  });

  test('should verify a valid token and return the payload', () => {
    const token = JwtService.generateToken(payload);
    const verifiedPayload = JwtService.verifyToken(token);

    expect(verifiedPayload).toMatchObject(payload);
  });

  test('should return null for invalid token', () => {
    const invalidToken = 'invalid.token';
    const verifiedPayload = JwtService.verifyToken(invalidToken);

    expect(verifiedPayload).toBeNull();
  });
});
