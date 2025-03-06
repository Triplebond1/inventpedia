import jwt from "jsonwebtoken";
import User from "../../models/user";
import { Response, NextFunction } from "express";
import { JwtPayload } from "../../types/interface";
import AuthRequest from "../../types/authRequest";
import { status } from "../../utilities/enums/statusCode";

const validateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.authToken;

    if (!token) {
      res
        .status(status.Unauthorized)
        .json({ message: "Authentication token is missing" });
      return;
    }

    // Verify JWT Token
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    if (!payload?.id) {
      res.status(status.Unauthorized).json({ message: "Invalid token" });
      return;
    }

    // Fetch user data from database 
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      res.status(status.NotFound).json({ message: "User not found" });
      return;
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res
        .status(status.Unauthorized)
        .json({ message: "Token has expired. Please log in again." });
      return;
    } else if (error.name === "JsonWebTokenError") {
      res
        .status(status.Unauthorized)
        .json({ message: "Invalid token. Authentication failed." });
      return;
    }
    res
      .status(status.ServerError)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
};

export default validateToken;
