import { Request } from 'express';
import { User } from './models/user.model.js';
import { JwtService } from './utils/jwt.service.js';

export interface Context {
  user?: User;
}

export async function buildContext({ req }: { req: Request }): Promise<Context> {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return {};
  }

  const payload = JwtService.verifyToken(token);

  if (payload && payload.userId) {
    const user = await User.findByPk(payload.userId);
    if (user) {
      return { user };
    }
  }

  return {};
}
