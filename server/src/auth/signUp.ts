import bcrypt from "bcryptjs";
import User from "../models/user";
import dotenv from "dotenv";
import { Response } from "express";
import AuthRequest from "../types/authRequest";
import { status } from "../utilities/enums/statusCode";
import { IUser } from "../models/user";


// @desc    Create a new user
// @route   POST /v1/api/users
// @access  Public (Registration) or Private (Admin creating users)

export const createUserHandler = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      let { username, email, password, role }: IUser = req.body;
  
      // Helper function to validate required fields
      const validateField = (field: string, fieldName: string): boolean => {
        if (!field || typeof field !== "string") {
          res
            .status(status.BadRequest)
            .json({ message: `${fieldName} should be a valid string` });
          return false; // Stop execution
        }
        return true;
      };
  
      // Validate fields
      if (
        !validateField(username, "Username") ||
        !validateField(email, "Email") ||
        !validateField(password, "Password")
      ) {
        return; // Stop execution if validation fails
      }
  
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
  
      // Password validation: At least 8 characters, 1 uppercase, 1 lowercase, 1 number
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        res.status(status.BadRequest).json({
          message:
            "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.",
        });
        return;
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
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