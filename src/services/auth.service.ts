import { User, UserRole } from '../models/user.model.js';
import { HashService } from '../utils/hash.service.js';
import { JwtService } from '../utils/jwt.service.js';

export class AuthService {
  static async register(email: string, password: string): Promise<User> {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await HashService.hash(password);
    return User.create({
      email,
      hashedPassword,
      role: UserRole.USER,
      createdAt: new Date(),
    });
  }

  static async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await HashService.verify(user.hashedPassword, password))) {
      throw new Error('Invalid email or password');
    }

    return JwtService.generateToken({ userId: user.id, role: user.role });
  }
}
