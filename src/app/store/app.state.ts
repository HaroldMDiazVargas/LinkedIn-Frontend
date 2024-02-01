// import { IAuthState } from "../auth/models";
import { IAuthState } from "../auth/store/authState";
import { authFeatureKey, authReducer } from "../auth/store/reducers";
import { IPostState } from "../home/store/postState.interface";
import { postFeatureKey, postReducer } from "../home/store/reducers";
import { sharedReducer } from "../shared/store/reducer";
import { SHARED_STATE_NAME } from "../shared/store/selector";
import { ISharedState } from "../shared/store/shared.state";


// This is all our app state
// export interface AppState {
//     [authFeatureKey]: IAuthState,
//     [postFeatureKey]: IPostState

// }

// export const appReducer = {
//     [authFeatureKey]: authReducer,
//     [postFeatureKey]: postReducer
// }


export interface AppState {
    [authFeatureKey]: IAuthState,
    [SHARED_STATE_NAME]: ISharedState

}

export const appReducer = {
    [authFeatureKey]: authReducer,
    [SHARED_STATE_NAME]: sharedReducer
}