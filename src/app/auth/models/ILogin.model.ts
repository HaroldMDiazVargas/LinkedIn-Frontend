import { User } from "./user.model";

export interface ILogin {
    email: string;
    password: string;
  }

export interface ICheckAuth {
    isAuthenticated: boolean;
    user?: User
}