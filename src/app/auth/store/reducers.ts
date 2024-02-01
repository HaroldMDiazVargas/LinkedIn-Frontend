import { createFeature, createReducer, on } from "@ngrx/store";
// import { IAuthState, User } from "../models";
// import { register } from "./actions";
import { authActions } from "./actions";
import { IAuthState } from "./authState";
// import { IAuthState } from "../models";

const initialState: IAuthState = {
    isSubmitting: false,
    currentUser: undefined,
    validationErrors: null,
    isLoading: false,
    submissionType: 'login'
}


const authFeature = createFeature({
    name: 'auth',                                                       //Name of our feature, on our Store{  auth:  } we have a slice property called auth!
    reducer: createReducer(
        initialState,
        on(authActions.register, (state) => ({...state, isSubmitting: true, validationErrors: null})),
        on(authActions.registerSuccess, (state, action) => ({
            ...state, 
            isSubmitting: false,
            currentUser: action.currentUser,
            submissionType: 'login' as 'login',
        })),
        on(authActions.registerFailure, (state, action) => ({
            ...state, 
            isSubmitting: false,
            validationErrors: action.errors
        })),
        on(authActions.changeSubmissionType, (state, action) => ({
            ...state,
            submissionType: state.submissionType === 'join' ? "login" : 'join' as ("login" | "join")
        })),
        on(authActions.login, (state, action) => ({
            ...state,
            isSubmitting: true, validationErrors: null
        })),
        on(authActions.loginFailure, (state, action) => ({
            ...state,
            isSubmitting: false, 
            validationErrors: action.errors
        })),
        on(authActions.loginSuccess, (state, action) => ({
            ...state,
            isSubmitting: true, 
            validationErrors: null,
            currentUser: action.currentUser
        })),

    )
})

// export const { name: authFeatureKey, reducer: authReducer } = authFeature;
export const { 
    name: authFeatureKey, 
    reducer: authReducer, 
    selectIsSubmitting,
    selectIsLoading,
    selectCurrentUser,
    selectValidationErrors,
    selectSubmissionType
} = authFeature;