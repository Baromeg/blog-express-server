import jwt from 'jsonwebtoken';

const rowSecret = process.env.JWT_SECRET;
if (!rowSecret) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}
const JWT_SECRET: jwt.Secret = rowSecret;

export class JwtService {
  static generateToken(
    payload: string | Buffer | object,
    expiresIn: jwt.SignOptions['expiresIn'] = '1h',
  ) {
    const options: jwt.SignOptions = { expiresIn };
    return jwt.sign(payload, JWT_SECRET, options);
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}
