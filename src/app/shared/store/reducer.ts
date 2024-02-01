import { createFeature, createReducer, on } from "@ngrx/store";
import { ISharedState } from "./shared.state";
import { setErrorMessage, setLoadingSpinner } from "./actions";


const initialState: ISharedState = {
    showLoading: false,
    errorMessage: ''
}

export const sharedReducer = createReducer(initialState,
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            showLoading: action.status
        }
    }),
    on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMessage: action.message
        }
    })
)

