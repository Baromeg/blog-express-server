import { sequelize } from '../database/index.js';
import { User, UserRole } from '../models/user.model.js';
import { Post } from '../models/post.model.js';
import { AuthService } from '../services/auth.service.js';

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced');

    const adminPassword = process.env.ADMIN_ROLE_PASSWORD;
    if (!adminPassword) {
      throw new Error('Missing required environment variable: ADMIN_ROLE_PASSWORD');
    }

    const hashedPassword = await AuthService.hashPassword(adminPassword);

    const user = await User.create({
      role: UserRole.ADMIN,
      email: 'admin@example.com',
      hashedPassword: hashedPassword,
    });

    console.log('User created:', user.toJSON());

    const post = await Post.create({
      title: 'Welcome to the Blog',
      content: 'This is the first post in your seeded database.',
      userId: user.id,
    });

    console.log('Post created:', post.toJSON());

    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed with error:', error);
    process.exit(1);
  }
}

seed();
