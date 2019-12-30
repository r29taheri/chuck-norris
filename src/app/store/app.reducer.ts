import { ActionReducerMap } from '@ngrx/store';

import * as fromFactList from './facts.reducer';

export interface AppState {
    factsList: fromFactList.State
}

export const appReducer: ActionReducerMap<AppState> = {
    factsList: fromFactList.factsReducer
}