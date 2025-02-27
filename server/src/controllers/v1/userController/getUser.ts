import { Request, Response } from "express";
import User from "../../../models/user";
import { status } from "../../../utilities/enums/statusCode";

// @desc    Get a single user by ID
// @route   GET /v1/api/users/:id
// @access  Private (Admin and the user themselves)
export const getUserHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.params.id;

    // Validate userId type
    if (typeof userId !== "string") {
      return res
        .status(status.BadRequest)
        .json({ message: "ID must be a string" });
    }

    // // Check if the requester is admin or the user themselves
    // if (req.user.role !== "admin" || req.user._id.toString() !== userId) {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    // Find user by ID and exclude password from the result
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(status.NotFound).json({ message: "User not found" });
    }

    // Return the user data
    return res.status(status.Success).json(user);
  } catch (error) {
    return res
      .status(status.ServerError)
      .json({ message: "Internal server error", error });
  }
};
