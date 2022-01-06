//This is responsible for giving data access and management for the userRouter.


import { User } from '../types';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

export const addUser = async ( username: string, password: string ): Promise<User | undefined> => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user: User = new UserModel({
            username: username,
            passwordHash: passwordHash
        });
        return await user.save();
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

