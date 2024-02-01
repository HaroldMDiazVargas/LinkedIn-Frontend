import { createActionGroup, props } from "@ngrx/store";
// import { ICreatePost } from "../models/createPost";
import { Post } from "../models/Post";
import { BackendErrorInterface } from "src/app/core/backendErrors.interface";
import { ICreatePost } from "../models/CreatePost";

export const postsActions = createActionGroup({
    source: 'post',                                                  //Namespace
    events: {
        GetLimitPosts: props<{ skip: number, take: number }>(),
        'GetLimitPosts success': props<{ posts: Post[] }>(),
        'GetLimitPosts failure': props<{ errors: BackendErrorInterface}>(),
        CreatePost: props<{ request: ICreatePost}>(),
        'CreatePost success': props<{ post: Post}>(),
        'CreatePost failure': props<{ errors: BackendErrorInterface}>(),
        UpdatePost: props<{ id: number, body: string }>(),
        'UpdatePost success': props<{ id: number, body: string}>(),
        'UpdatePost failure': props<{ errors: BackendErrorInterface}>(),
        DeletePost: props<{ id: number }>(),
        'DeletePost success': props<{ id: number}>(),
        'DeletePost failure': props<{ errors: BackendErrorInterface}>()
    }
})
 