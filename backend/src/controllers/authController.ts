import { Request, Response } from 'express';
import { registerUser, findUserByEmail, validatePassword } from '../services/userService';
import { generateToken } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    if (findUserByEmail(email)) {
        return res.status(400).json({ message: 'Email already registered' });
    }
    const user = await registerUser(name, email, password, role);
    const token = generateToken(user);
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isValid = await validatePassword(password, user.password);
    if (!isValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
};
