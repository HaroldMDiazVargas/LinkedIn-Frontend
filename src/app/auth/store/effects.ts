import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { User } from "../models";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { setLoadingSpinner } from "src/app/shared/store/actions";


// createEffect takes twos args
    // 1st arg. Function  takes actions, services we need. Returns observable
    // 2nd arg. object functional property, we want to create effect in a functional way
export const registerEffect = createEffect((
    actions$ = inject(Actions),                                             //access to our actions in our app, inject them!
    authService = inject(AuthService)

) => {
    return actions$.pipe(
        ofType(authActions.register),                                     //Limit this actions stream to just Actions what we need!
        switchMap(({request}) => {
            return authService.register(request).pipe(
                map((currentUser: User) => {
                    return authActions.registerSuccess({ currentUser })        //return is similar to "dispatch" the action
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(authActions.registerFailure({errors: errorResponse.error }))
                })
            )
        })
    )
}, { functional: true })

export const loginEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    store = inject(Store)
) => {
    return actions$.pipe(
        ofType(authActions.login),
        switchMap(({ request }) => {        //mergeMap or exhaustMap, is used also but is like emit single Observable when all innerObservables

            return authService.login(request).pipe(
                map((currentUser: User) => {
                    store.dispatch(setLoadingSpinner({ status: false}));
                    return authActions.loginSuccess({ currentUser })
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    store.dispatch(setLoadingSpinner({ status: false}));
                    return of(authActions.loginFailure({ errors: errorResponse.error }))
                })
            )
        })
    )
}, { functional: true })

export const redirectAfterLoginEffect = createEffect(
    (actions$ = inject(Actions),
    router = inject(Router)
    ) => {
        return actions$.pipe(
            ofType(authActions.loginSuccess),
            tap(() => {
                router.navigateByUrl('/private')
            })
        )
    }, { functional: true, dispatch: false }
)
