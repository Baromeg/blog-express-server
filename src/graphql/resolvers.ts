import { GraphQLError } from 'graphql';
import { Context } from '../context.js';
import { Post } from '../models/post.model.js';
import { User, UserRole } from '../models/user.model.js';
import { AuthService } from '../services/auth.service.js';
import {
  MutationCreatePostArgs,
  MutationDeletePostArgs,
  MutationLoginArgs,
  MutationRegisterArgs,
  QueryPostArgs,
  QueryUserArgs,
} from './__generated__/graphql.js';
import { requireAuth } from './guards/requireAuth.js';

export const resolvers = {
  Query: {
    users: async (_parent: unknown, _args: unknown, context: Context) => {
      requireAuth(context, UserRole.ADMIN);

      return User.findAll();
    },
    user: async (_parent: unknown, { id }: QueryUserArgs, context: Context) => {
      requireAuth(context);

      return User.findByPk(id);
    },
    posts: async (_parent: unknown, _args: unknown, _context: Context) => {
      return Post.findAll();
    },
    post: async (_parent: unknown, { id }: QueryPostArgs) => {
      return Post.findByPk(id);
    },
  },
  Mutation: {
    register: async (_parent: unknown, args: MutationRegisterArgs) => {
      const { email, password } = args.input;

      return AuthService.register(email, password);
    },
    login: async (_parent: unknown, args: MutationLoginArgs) => {
      const { email, password } = args.input;

      return { token: AuthService.login(email, password) };
    },
    createPost: async (_parent: unknown, args: MutationCreatePostArgs, context: Context) => {
      const user = requireAuth(context);
      const { title, content } = args.input;

      return Post.create({ title, content, userId: user.id });
    },

    deletePost: async (_parent: unknown, args: MutationDeletePostArgs, context: Context) => {
      const user = requireAuth(context);
      const post = await Post.findByPk(args.id);

      if (!post) {
        throw new GraphQLError('Post not found');
      }
      if (user.role !== UserRole.ADMIN && user.id !== post.userId) {
        throw new GraphQLError('Not authorised to delete this post');
      }
      await post.destroy();
      return true;
    },
  },
  Post: {
    user: async (parent: Post, _args: unknown, _context: Context) => {
      return User.findByPk(parent.userId);
    },
  },
};
