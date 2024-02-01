import { HttpErrorResponse } from "@angular/common/http"
import { inject } from "@angular/core"
import { createEffect, Actions, ofType } from "@ngrx/effects"
import { switchMap, map, catchError, of } from "rxjs"
import { User } from "src/app/auth/models"
import { AuthService } from "src/app/auth/services/auth.service"
import { authActions } from "src/app/auth/store/actions"
import { PostService } from "../services/post.service"
import { postsActions } from "./actions"
import { Post } from "../models/Post"



export const getPostsEffect = createEffect((
    actions$ = inject(Actions),                                             //access to our actions in our app, inject them!
    postService = inject(PostService)

) => {
    return actions$.pipe(
        ofType(postsActions.getLimitPosts),                                     //Limit/Filter this actions stream to just Actions what we need!
        switchMap(({skip, take}) => {
            const params = `?take=${take}&skip=${skip}`
            return postService.getSelectedPosts(params).pipe(
                map((posts: Post[]) => {
                    return postsActions.getLimitPostsSuccess({ posts  })        //return is similar to "dispatch" the action
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(postsActions.getLimitPostsFailure({errors: errorResponse.error }))
                })
            )
        })
    )
}, { functional: true })


export const createPostEffect = createEffect((
    actions$ = inject(Actions),                                             //access to our actions in our app, inject them!
    postService = inject(PostService)

) => {
    return actions$.pipe(
        ofType(postsActions.createPost),                                     //Limit this actions stream to just Actions what we need!
        switchMap(({request: { body }}) => {
            return postService.createPost(body).pipe(
                map((post: Post) => {
                    return postsActions.createPostSuccess({ post  })        //return is similar to "dispatch" the action
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(postsActions.createPostFailure({errors: errorResponse.error }))
                })
            )
        })
    )
}, { functional: true })


export const updatePostEffect = createEffect((
    actions$ = inject(Actions),                                             
    postService = inject(PostService)

) => {
    return actions$.pipe(
        ofType(postsActions.updatePost),                                     
        switchMap(({id, body }) => {
            return postService.updatePost(id, body).pipe(
                map(() => {
                    return postsActions.updatePostSuccess({id, body})        
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(postsActions.updatePostFailure({errors: errorResponse.error }))
                })
            )
        })
    )
}, { functional: true })

export const deletePostEffect = createEffect((
    actions$ = inject(Actions),                                             
    postService = inject(PostService)

) => {
    return actions$.pipe(
        ofType(postsActions.deletePost),                                     
        switchMap(({id }) => {
            return postService.deletePost(id).pipe(
                map(() => {
                    return postsActions.deletePostSuccess({id})        
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(postsActions.deletePostFailure({errors: errorResponse.error }))
                })
            )
        })
    )
}, { functional: true })