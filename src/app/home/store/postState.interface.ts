// import { User } from "./user.model";
import { BackendErrorInterface } from '../../core/backendErrors.interface';
import { Post } from '../models/Post';

// For each single feature we will create a slice of State
export interface IPostState {
    posts: Post[]
    validationErrors: BackendErrorInterface | null
}