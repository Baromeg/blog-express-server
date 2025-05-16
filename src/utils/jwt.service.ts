import jwt, { SignOptions, JwtPayload as JwtPayloadBase } from 'jsonwebtoken';
import { JwtPayload } from '../types/jwt-payload';

const rowSecret = process.env.JWT_SECRET;
if (!rowSecret) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}
const JWT_SECRET: jwt.Secret = rowSecret;

export class JwtService {
  static generateToken(payload: JwtPayload, expiresIn: SignOptions['expiresIn'] = '1h') {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, JWT_SECRET, options);
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload & JwtPayloadBase;
    } catch (error) {
      return null;
    }
  }
}
