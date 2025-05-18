import { GraphQLError } from 'graphql';
import { GraphQLContext } from '../context.js';
import { Post } from '../models/post.model.js';
import { User, UserRole } from '../models/user.model.js';
import { AuthService } from '../services/auth.service.js';
import {
  AuthPayload,
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
    users: async (_parent: unknown, _args: unknown, context: GraphQLContext): Promise<User[]> => {
      requireAuth(context, UserRole.ADMIN);

      return User.findAll();
    },
    user: async (
      _parent: unknown,
      { id }: QueryUserArgs,
      context: GraphQLContext,
    ): Promise<User | null> => {
      requireAuth(context);

      return User.findByPk(id);
    },
    posts: async (_parent: unknown, _args: unknown, _context: GraphQLContext): Promise<Post[]> => {
      return Post.findAll();
    },
    post: async (_parent: unknown, { id }: QueryPostArgs): Promise<Post | null> => {
      return Post.findByPk(id);
    },
  },
  Mutation: {
    register: async (_parent: unknown, args: MutationRegisterArgs): Promise<User> => {
      const { email, password } = args.input;

      return AuthService.register(email, password);
    },
    login: async (_parent: unknown, args: MutationLoginArgs): Promise<AuthPayload> => {
      const { email, password } = args.input;
      const token = await AuthService.login(email, password);

      return { token };
    },
    createPost: async (
      _parent: unknown,
      args: MutationCreatePostArgs,
      context: GraphQLContext,
    ): Promise<Post> => {
      const user = requireAuth(context);
      const { title, content } = args.input;

      return Post.create({ title, content, userId: user.id });
    },

    deletePost: async (
      _parent: unknown,
      args: MutationDeletePostArgs,
      context: GraphQLContext,
    ): Promise<boolean> => {
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
    user: async (parent: Post, _args: unknown, context: GraphQLContext): Promise<User | null> => {
      return context.loaders?.userLoader.load(parent.userId);
    },
  },
};
