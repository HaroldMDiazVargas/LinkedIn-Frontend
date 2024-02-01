import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { ILogin, ISignup, User } from "../models";
import { BackendErrorInterface } from './../../core/backendErrors.interface';

// export const register = createAction(
//     '[Auth] Register', 
//     props<{ request: ISignup }>()
// );

// export const registerSuccess = createAction(
//     '[Auth] RegisterSuccess', 
//     props<{ request: ISignup }>()
// );

// export const registerFailure = createAction(
//     '[Auth] RegisterFailure', 
//     props<{ request: ISignup }>()
// );

// Group of actions in single object
export const authActions = createActionGroup({
    source: 'auth',                                                  //Namespace
    events: {
        Register: props<{ request: ISignup }>(),
        'Register success': props<{ currentUser: User}>(),
        'Register failure':  props<{ errors: BackendErrorInterface}>(), //emptyProps()
        ChangeSubmissionType: props<{ submissionType: 'login' | 'join' | null}>(),
        Login: props<{ request: ILogin }>(),
        'Login success': props<{ currentUser: User }>(),
        'Login failure': props<{errors: BackendErrorInterface}>()
    },

})
