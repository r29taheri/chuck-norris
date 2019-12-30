import { Action } from '@ngrx/store';

import { Fact } from './../models/fact';

export const RANDOM_FACT = '[FactList] Get random fact';
export const ADD_FACT = '[FactList] Add fact';
export const FACTS_WITH_CATEGORY = '[FactList] Get facts with category';
export const UPDATE_FACT = '[FactList] Update fact';
export const DELETE_FACT = '[FactList] Delete fact';
export const START_EDIT = '[FactList] Start edit';
export const STOP_EDIT = '[FactList] Stop edit';
export const FAIL_REQUEST = '[FactList] Fail request';
export const GET_CATEGORIES = '[FactList] Get Categories';
export const ADD_CATEGORIES = '[FactList] Add Categories';

export class AddFact implements Action {
    readonly type = ADD_FACT;
    constructor(public payload: Fact) {}
}

export class FactsWithCategory implements Action {
    readonly type = FACTS_WITH_CATEGORY;
    constructor(public payload: string) {}
}

export class UpdateFact implements Action {
    readonly type = UPDATE_FACT;
    constructor(public payload: { index: number, fact: Fact }) {}
}

export class DeleteFact implements Action {
    readonly type = DELETE_FACT;
    constructor(public payload: string) {}
}
export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: string) {}
}
export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class RandomFact implements Action {
    readonly type = RANDOM_FACT;
    constructor(public payload: string) {}
}

export class FailRequest implements Action {
    readonly type = FAIL_REQUEST;
    constructor(public payload: string) {}
}
export class GetCategories implements Action {
    readonly type = GET_CATEGORIES;
}
export class AddCategories implements Action {
    readonly type = ADD_CATEGORIES;
    constructor(public payload: []) {}
}

export type FactActions = AddFact | FactsWithCategory | UpdateFact | DeleteFact | StartEdit | StopEdit | RandomFact | FailRequest | GetCategories | AddCategories;