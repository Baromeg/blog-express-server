import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Post } from './post.model.js';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER,
  })
  role!: UserRole;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashedPassword!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken?: string;

  @HasMany(() => Post)
  posts!: Post[];
}
