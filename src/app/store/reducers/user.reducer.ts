import * as actions from '../actions';
import { User } from 'src/app/models/user';

export function userReducer(state = intitialUserState, action: actions.UserActions) {

    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_NEW_USER:
            newState.signedInUser = {} as User;
            return newState;
        case actions.REQUEST_GET_EXISTING_USER:
            newState.signedInUser = {} as User;
            return newState; 
        case actions.GET_USER_SUCCESS:
            const getUserSuccessAction = action as actions.GetUserSuccess;
            newState.signedInUser = getUserSuccessAction.payload;            
            return newState;   
        case actions.LOG_OUT_USER:
            newState.signedInUser = {} as User;
            return newState;    
        default:
            return state;        
    }
}

export const intitialUserState = {
    signedInUser: {} as User
}