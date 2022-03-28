import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
}

export const userReducer = (state = INITIAL_STATE, action) => { //Must supply INITIAL_STATE once since we're not using useReducer(reducer, INITIAL_STATE). 
    const { type, payload } = action; //ALL reducers receive ALL actions dispatched throughout the app...ever.

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state; //Literally return the previous state. Same state object in memory - no state change - important for re-render logic. 
    }
}