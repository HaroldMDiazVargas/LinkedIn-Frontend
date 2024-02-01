import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISharedState } from "./shared.state";


export const SHARED_STATE_NAME = 'shared';


const getSharedState = createFeatureSelector<ISharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedState, (state: ISharedState) => state.showLoading)