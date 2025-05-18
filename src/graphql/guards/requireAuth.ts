import { Context } from '../../context.js';
import { UserRole } from '../../models/user.model.js';

export function requireAuth(context: Context, requiredRole?: UserRole) {
  const user = context.user;
  if (!user) {
    throw new Error('Not authenticated');
  }

  if (requiredRole && user.role !== requiredRole) {
    throw new Error('Not authorised');
  }

  return user;
}
