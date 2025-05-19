import { Sequelize } from 'sequelize-typescript';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';

export const sequelize = new Sequelize(process.env.DATABASE_URL ?? '', {
  dialect: 'postgres',
  models: [Post, User],
});
