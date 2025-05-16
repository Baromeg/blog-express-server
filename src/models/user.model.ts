import { Column, DataType, Model, Table, HasMany, PrimaryKey, Default } from 'sequelize-typescript';
import { Post } from './post.model.js';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: CreationOptional<string>;

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
  posts!: CreationOptional<Post[]>;
}
