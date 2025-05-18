import DataLoader from 'dataloader';
import { User } from '../models/user.model.js';

export function createUserLoader() {
  return new DataLoader<string, User | null>(async (userIds) => {
    console.log({ userIds });

    const users = await User.findAll({ where: { id: userIds } });
    console.log({ users });

    const userMap = new Map(users.map((user) => [user.id, user]));

    return userIds.map((id) => userMap.get(id) || null);
  });
}
