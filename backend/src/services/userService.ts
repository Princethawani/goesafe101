import { User } from '../types/users';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = []; // In-memory user storage for now

export const registerUser = async (name: string, email: string, password: string, role: 'user' | 'admin' = 'user'): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = { id: uuidv4(), name, email, password: hashedPassword, role };
    users.push(user);
    return user;
};

export const findUserByEmail = (email: string): User | undefined => {
    return users.find(u => u.email === email);
};

export const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
