// import { IAuthState } from "../auth/models";
import { IAuthState } from "../auth/store/authState";
import { authFeatureKey, authReducer } from "../auth/store/reducers";
import { IPostState } from "../home/store/postState.interface";
import { postFeatureKey, postReducer } from "../home/store/reducers";


// This is all our app state
export interface AppState {
    [authFeatureKey]: IAuthState,
    [postFeatureKey]: IPostState

}

export const appReducer = {
    [authFeatureKey]: authReducer,
    [postFeatureKey]: postReducer
}