//This is responsible for giving data access and management for the userRouter.


import { User } from '../types';
import UserModel from '../models/user';

export const addUser = async ( username: string, password: string ): Promise<User | undefined> => {
    console.log('Got it');
    try {
        const user: User = new UserModel({
            username: username,
            passwordHash: password
        });

        return await user.save();
    } catch (e) {
        console.log(e);
    }
};