  
import { Response, NextFunction } from "express";
import type AuthRequest from "../../types/authRequest";
import { status } from "../../utilities/enums/statusCode";

const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role; 

    if (!userRole || !roles.includes(userRole)) {
      return res.status(status.accessDenied).json({ message: `User role '${userRole}' is not authorized to access this route` });
    }
    
    next();
  };
};

export { authorize };
