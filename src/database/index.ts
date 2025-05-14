import { Sequelize } from 'sequelize-typescript';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [Post, User],
});
