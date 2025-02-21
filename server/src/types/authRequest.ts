import { Request } from "express";
import { IUser} from "../models/user";

export default interface AuthRequest extends Request {
  user?: IUser;
}
