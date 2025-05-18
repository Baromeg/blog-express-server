import { sequelize } from '../database/index.js';
import { User, UserRole } from '../models/user.model.js';
import { Post } from '../models/post.model.js';
import { HashService } from '../utils/hash.service.js';

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced Starting seeding...');

    const usersData = [
      { email: 'admin@example.com', password: 'password', role: UserRole.ADMIN },
      { email: 'user1@example.com', password: 'password', role: UserRole.USER },
      { email: 'user2@example.com', password: 'password', role: UserRole.USER },
    ];

    const users = await Promise.all(
      usersData.map(async (user) => {
        const hashedPassword = await HashService.hash(user.password);
        return User.create({ email: user.email, hashedPassword: hashedPassword, role: user.role });
      }),
    );

    const postsData = [
      { title: 'First Post', content: 'Content of first post', userId: users[0].id },
      { title: 'Second Post', content: 'Content of second post', userId: users[1].id },
      { title: 'Third Post', content: 'Content of third post', userId: users[2].id },
      { title: 'Fourth Post', content: 'Content of fourth post', userId: users[1].id },
      { title: 'Fifth Post', content: 'Content of fifth post', userId: users[2].id },
    ];

    await Post.bulkCreate(postsData);

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed with error:', error);
    process.exit(1);
  }
}

seed();
