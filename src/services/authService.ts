import { IUser } from '../models/userModel';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookie } from '../utils/generate_token';
import { Response } from 'express';
import { Document } from 'mongoose';

interface IRegisterUser {
    email: string;
    password: string;
}

const registeruser = async (newuser: IRegisterUser, res: Response): Promise<void> => {
    try {
        const { email, password } = newuser;
        if (!email || !password) {
            throw new Error("Email and Password are required");
        }

        const existingUser = await User.findOne({ email: email }).exec();
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const user = new User({
            email: email,
            password: hashPassword,
            Image: image
        });

        const token = generateTokenAndSetCookie(user._id as string, res);
        await user.save();

        res.status(201).json({ message: "User created successfully, token generated", token });


    } catch (error) {
        console.log(error);
    }
}

const loginuser = async (userlogin: IRegisterUser, res: Response): Promise<void> => {
    try {
        const { email, password } = userlogin;
        if (!email || !password) {
            throw new Error("Email and Password are required");
        }

        const existingUser = await User.findOne({ email: email }).exec();
        if (!existingUser) {
            throw new Error("User does not exist");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Password is incorrect");
        }

        const token = generateTokenAndSetCookie(existingUser._id as string, res);

        res.status(200).json({ message: "User logged in successfully, token generated", token });

    }
    catch (error) {
        console.log(error);
    }
}


export { registeruser, loginuser };