import { createFeature, createReducer, on } from "@ngrx/store";
import { IPostState } from "./postState.interface";
import { postsActions } from "./actions";

const initialState: IPostState = {
    posts: [],
    validationErrors: null
}

const postFeature = createFeature({
    name: 'post',
    reducer: createReducer(
        initialState,
        on(postsActions.getLimitPosts, (state, action) => ({
            ...state,
            validationErrors: null
        })),
        on(postsActions.getLimitPostsSuccess, (state, action) => ({
            ...state,
            posts: [...state.posts, ...action.posts],
            validationErrors: null
        })),
        on(postsActions.getLimitPostsFailure, (state, action) => ({
            ...state,
            validationErrors: action.errors
        })),
        on(postsActions.createPost, (state, action) => ({
            ...state,
            validationErrors: null
        })),
        on(postsActions.createPostSuccess, (state, action) => ({
            ...state,
            posts: [action.post, ...state.posts],
            validationErrors: null
        })),
        on(postsActions.createPostFailure, (state, action) => ({
            ...state,
            validationErrors: action.errors
        })),
        on(postsActions.updatePost, (state, action) => ({
            ...state,
            validationErrors: null
        })),
        on(postsActions.updatePostSuccess, (state, action) => {
            // const postToUpdate = [...state.posts].find(post => post.id === action.id);
            const updatedPosts = state.posts.map(post => {
                return action.id === post.id ? { ...post, body: action.body } : post
            })
            return {
                ...state,
                posts: [...updatedPosts],
                validationErrors: null
            }
        }),
        on(postsActions.updatePostFailure, (state, action) => ({
            ...state,
            validationErrors: action.errors
        })),
        on(postsActions.deletePost, (state, action) => ({
            ...state,
            validationErrors: null
        })),
        on(postsActions.deletePostSuccess, (state, action) => {
            const updatedPosts = state.posts.filter(post => action.id !== post.id)
            return {
                ...state,
                posts: [...updatedPosts],
                validationErrors: null
            }
        }),
        on(postsActions.deletePostFailure, (state, action) => ({
            ...state,
            validationErrors: action.errors
        }))
    )
})


export const { 
    name: postFeatureKey, 
    reducer: postReducer, 
    selectValidationErrors,
    selectPosts
} = postFeature;