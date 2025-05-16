import { Context } from '../context.js';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';
import { AuthService } from '../services/auth.service.js';

export const resolvers = {
  Query: {
    users: async () => User.findAll(),
    user: async (_: any, { id }: { id: string }) => {
      return User.findByPk(id);
    },
    posts: async () => Post.findAll(),
    post: async (_: any, { id }: { id: string }) => {
      return Post.findByPk(id);
    },
    me: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return context.user;
    },
  },
  Mutation: {
    register: async (_: any, { email, password }: { email: string; password: string }) => {
      return AuthService.register(email, password);
    },
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      return AuthService.login(email, password);
    },
  },
  Post: {
    user: async (parent: Post) => {
      return User.findByPk(parent.userId);
    },
  },
};
