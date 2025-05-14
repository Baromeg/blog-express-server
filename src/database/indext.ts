import { Sequelize } from 'sequelize-typescript';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  models: [Post, User],
});
