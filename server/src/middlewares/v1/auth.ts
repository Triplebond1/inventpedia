import jwt from "jsonwebtoken";
import User from "../../models/user";
import { Response, NextFunction } from "express";
import { JwtPayload } from "../../types/interface";
import AuthRequest from "../../types/authRequest";



const validateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.authToken;

    if (!token) {
      return res.status(401).json({ message: "Authentication token is missing" });
    }

    // Verify JWT Token
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    if (!payload?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Fetch user data from database (Best Practice)
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Authentication failed." });
    }
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default validateToken;
