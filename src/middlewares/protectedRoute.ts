import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";

interface DecodedToken {
    userId: string;
}

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers["authorization"];
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
            return;
        }

        const token = authHeader.split(" ")[1];

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY) as DecodedToken;

        if (!decoded) {
            res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
            return;
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        req.user = user;

        next();
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in protectRoute middleware: ", error.message);
        } else {
            console.log("Error in protectRoute middleware: ", error);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};