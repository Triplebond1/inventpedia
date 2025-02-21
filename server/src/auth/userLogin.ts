import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { JwtPayload } from "../types/interface";

dotenv.config();

//@desc LOGGING user
//@route POST /v1/api/users/login
//@access public
export const logInUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let {
      usernameOrEmail,
      password,
    }: { usernameOrEmail: string; password: string } = req.body;

    if (!usernameOrEmail || typeof usernameOrEmail !== "string") {
      res
        .status(400)
        .json({ message: "Provide either a valid email or username" });
      return;
    }

    if (!password || typeof password !== "string") {
      res.status(400).json({ message: "Password should be a string" });
      return;
    }

    usernameOrEmail = usernameOrEmail.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(usernameOrEmail);

    const query: { email?: string; username?: string } = isValidEmail
      ? { email: usernameOrEmail }
      : { username: usernameOrEmail };

    const user = await User.findOne(query);
    if (!user) {
      res.status(400).json({ message: `User ${usernameOrEmail} not found` });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const payload = <JwtPayload>{
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "7d",
    });

    const userData = <IUser>{
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    res.status(200).json({
      message: "Logged in successfully",
      user: userData.toJSON,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
