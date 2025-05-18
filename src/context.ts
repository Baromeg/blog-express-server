import { Request } from 'express';
import { User } from './models/user.model.js';
import { JwtService } from './utils/jwt.service.js';
import { createUserLoader } from './loaders/user.loader.js';
import { JwtPayload } from './types/jwt-payload.js';

export interface GraphQLContext {
  req: Request;
  user?: User | null;
  loaders: {
    userLoader: ReturnType<typeof createUserLoader>;
  };
}

export async function buildContext({ req }: { req: Request }): Promise<GraphQLContext> {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  let user: User | null = null;

  if (token) {
    const payload = JwtService.verifyToken(token) as JwtPayload | null;
    if (payload && payload.userId) {
      user = await User.findByPk(payload.userId);
    }
  }

  return { req, user, loaders: { userLoader: createUserLoader() } };
}
