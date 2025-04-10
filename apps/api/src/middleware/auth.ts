import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.model.js';


const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<any>=> {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
      
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await UserModel.findOne({_id:decoded.userId})

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
     
    }

    req.user = user; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
