import argon2 from 'argon2';

export class HashService {
  static async hash(password: string): Promise<string> {
    return argon2.hash(password, { type: argon2.argon2id });
  }

  static async verify(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
