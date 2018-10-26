import * as actions from '../actions';

export function userReducer(state = intitialUserState, action: actions.UserActions) {

    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_USER:
            newState.user = null;
            return newState;
        case actions.GET_USER_SUCCESS:
            const getUserSuccessAction = action as actions.GetUserSuccess;
            newState.user = getUserSuccessAction.payload;
            return newState;
        default:
            return state;        
    }
}

export const intitialUserState = {
    user: null
}