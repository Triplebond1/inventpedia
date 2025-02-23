import { Request, Response } from "express";

export const logOutUserHandler = async (req: Request, res: Response):Promise<void> => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0), // Expire the cookie immediately
    });

    res.status(200).json({ message: "Logged out successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: "Logout failed", error: error.message });
    return;
  }
};
