import argon2 from 'argon2';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password, { type: argon2.argon2id });
  }

  static async verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }
}
