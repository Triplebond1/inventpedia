import { IUser } from "../models/user";
// export interface IUser {
//     id: unknown;
//     username: string;
//     email: string;
//     role: string;
//     password: string;
//   };

export interface JwtPayload extends IUser {
    id: unknown,
    email: string,
    role: string,
  }