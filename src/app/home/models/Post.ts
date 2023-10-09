import { User } from "src/app/auth/models";

export interface Post {
    id: number;
    body: string;
    createdAt: Date,
    updatedAt: Date,
    author: User
}