import bcrypt from "bcryptjs";
import User from "../models/user";
import dotenv from "dotenv";
import { Response } from "express";
import AuthRequest from "../types/authRequest";
import { status } from "../utilities/enums/statusCode";
import { IUser } from "../models/user";
import { validateEmail, validatePassword, validateRequiredField } from "../utilities/helpers/validateField";


// @desc    Create a new user
// @route   POST /v1/api/users
// @access  Public (Registration) or Private (Admin creating users)

export const createUserHandler = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      let { username, email, password, role }: IUser = req.body;
  
      validateRequiredField(username, "username", "string")
      validateRequiredField(email, "email", "string")
      validateRequiredField(password, "password", "string")

      // Convert username and email to lowercase
      username = username.toLowerCase();
      email = email.toLowerCase();
  
      // Only allow admin to set the role, otherwise default to "subscriber"
      if (req.user && req.user.role === "admin" && role) {
        if (typeof role !== "string") {
           res
            .status(status.BadRequest)
            .json({ message: "Role should be a string" });
          return;
        }
        role = role.toLowerCase();
      } else {
        role = "subscriber";
      }

      //email validation
      validateEmail(email)
      // Password validation: At least 8 characters, 1 uppercase, 1 lowercase, 1 number
      validatePassword(password)
  
      // Check if user already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        res
          .status(status.BadRequest)
          .json({ message: "User with this email already exists" });
        return;
      }
  
      // Hash password securely
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      });
  
      // Return success response
     res.status(status.Created).json({
        message: "User created successfully",
        user: <IUser>{
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
     res.status(status.ServerError).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
     });
      return;
    }
  };