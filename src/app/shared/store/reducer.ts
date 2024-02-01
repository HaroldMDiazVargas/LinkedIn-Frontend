import { createFeature, createReducer, on } from "@ngrx/store";
import { ISharedState } from "./shared.state";
import { setLoadingSpinner } from "./actions";


const initialState: ISharedState = {
    showLoading: false
}

export const sharedReducer = createReducer(initialState,
    on(setLoadingSpinner, (state, action) => {
        return {
            state,
            showLoading: action.status
        }
    })
)

