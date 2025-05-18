import { HashService } from './hash.service';
import { describe, expect, test } from 'vitest';

describe('HashService', () => {
  const password = 'securePassword123';

  test('should hash and verify a password correctly', async () => {
    const hash = await HashService.hash(password);
    const isValid = await HashService.verify(hash, password);

    expect(isValid).toBe(true);
  });

  test('fails to hash and verify the wrong password', async () => {
    const hash = await HashService.hash(password);
    const isValid = await HashService.verify(hash, 'wrongPassword');

    expect(isValid).toBe(false);
  });
});
