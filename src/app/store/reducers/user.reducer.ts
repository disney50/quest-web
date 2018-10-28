import * as actions from '../actions';

export function userReducer(state = intitialUserState, action: actions.UserActions) {

    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_SIGNED_IN_USER:
            newState.signedInUser = null;
            return newState;
        case actions.GET_USER_SUCCESS:
            const getUserSuccessAction = action as actions.GetUserSuccess;
            newState.signedInUser = getUserSuccessAction.payload;
            return newState;
        default:
            return state;        
    }
}

export const intitialUserState = {
    signedInUser: null
}