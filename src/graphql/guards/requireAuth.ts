import { GraphQLContext } from '../../context.js';
import { UserRole } from '../../models/user.model.js';

export function requireAuth(context: GraphQLContext, requiredRole?: UserRole) {
  const user = context.user;
  if (!user) {
    throw new Error('Not authenticated');
  }

  if (requiredRole && user.role !== requiredRole) {
    throw new Error('Not authorised');
  }

  return user;
}
