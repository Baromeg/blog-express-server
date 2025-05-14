import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model.js';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'posts', timestamps: true })
export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: CreationOptional<string>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: CreationOptional<User>;
}
