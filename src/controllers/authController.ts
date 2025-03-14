import user from '../models/userModel';
import { Request, Response } from 'express';
import { IUser, userSchema, userValidationSchema, usersignupValidationSchema } from '../models/userModel';
import { z } from 'zod';
import { promises } from 'dns';
import { register } from 'module';
import { registeruser,loginuser } from '../services/authService';

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedUser = usersignupValidationSchema.parse(req.body);
        const newuser = validatedUser
        await  registeruser(newuser, res)
        console.log(newuser)
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "User not created" });
    }
}


const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedUser = usersignupValidationSchema.parse(req.body);
        const userlogin = validatedUser
        await loginuser(userlogin, res)

    }
    catch (error) {
        res.status(400).json({ message: "User not created" });
    }
}


const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('jwt-netflix')
        res.status(200).json({ message: "User logged out" });
    }
    catch (error) {
        res.status(400).json({ message: "User not logged out" });
    }
}

const checkAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: "User is authenticated" });
    }
    catch (error) {
        res.status(400).json({ message: "User is not authenticated" });
    }
}

export { signup, login, logout, checkAuth };
