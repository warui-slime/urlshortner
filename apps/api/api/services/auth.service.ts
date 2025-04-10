import type { User } from "@repo/shared/UserSchema"
import { UserModel } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../lib/dbConnect.js";

const JWT_SECRET = process.env.JWT_SECRET!;


export class AuthService {

  async signup(userData: User) {
    await dbConnect()
    const existingUser = await UserModel.findOne({
      email: userData.email
    });

    if (existingUser) {
      if (existingUser.email === userData.email) {
        throw new Error("Email already registered");
      }
    }




    const user = new UserModel({
      email: userData.email,
      password: userData.password
    });
    await user.save();
    return user;
  }


  async login(userData: User) {
    const user = await UserModel.findOne({
      email: userData.email
    });


    if (!user || !(await bcrypt.compare(userData.password, user.password))) {
      throw new Error("Invalid credentials");
    }


    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "2h",
    });


    return { user, token };
  }
}