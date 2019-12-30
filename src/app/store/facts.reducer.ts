import { Fact } from '../models/fact';
import * as factActions from './facts.action';

export interface State {
    categories: [];
    facts: Fact[];
    factsWithCategory: Fact[];
    editedFact: Fact;
    editedFactId: string;
    requestError: string;
    loading: boolean;
}

const initialState: State = {
    categories: [],
    facts: new Array<Fact>(),
    factsWithCategory: new Array<Fact>(),
    editedFact: null,
    editedFactId: 'none',
    requestError: null,
    loading: false
}


export function factsReducer(state: State = initialState, action: factActions.FactActions) {
    switch(action.type) {
        case factActions.GET_CATEGORIES:
            return {
                ...state,
                requestError: null,
                loading: true
            }
        case factActions.ADD_CATEGORIES:
            return {
                ...state,
                requestError: null,
                loading: false,
                categories: action.payload
            }
        case factActions.RANDOM_FACT:
            return {
                ...state,
                requestError: null,
                loading: true
            }
        case factActions.ADD_FACT:
            const isDuplicate = state.facts.find(fact => {
                return fact.id === action.payload.id;
            })
            const addNew = isDuplicate ? [...state.facts] : [...state.facts, action.payload];
            return {
                ...state,
                requestError: null,
                facts: addNew,
                loading: false
            }
        case factActions.FAIL_REQUEST:
            return {
                ...state,
                requestError: action.payload,
                loading: false
            }
        case factActions.FACTS_WITH_CATEGORY:
            return {
                ...state,
                loading: false,
                requestError: null,
                factsWithCategory: state.facts.filter(fact => {
                    return fact.category === action.payload;
                })
            }
        case factActions.UPDATE_FACT:
            const fact = state.facts[action.payload.index];
            const updatedFact = {
                ...fact,
                ...action.payload.fact
            };
            const updatedFacts = [...state.facts];
            updatedFacts[action.payload.index] = updatedFact;
            return {
                ...state,
                facts: updatedFacts
            }
        case factActions.DELETE_FACT:
            return {
                ...state,
                facts: state.facts.filter(fact => {
                    return fact.id !== action.payload;
                })
            }
        case factActions.START_EDIT:
            return {
                ...state,
                editedFactId: action.payload,
                editedFact: state.facts.find(fact => {
                    return fact.id === action.payload;
                })
            }
        case factActions.STOP_EDIT:
            return {
                ...state,
                editedFactId: 'none',
                editedFact: null
            }
        default:
            return state;
    }
}