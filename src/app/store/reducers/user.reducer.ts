import * as actions from '../actions';
import { User } from 'src/app/models/user';

export function userReducer(userState = initialUserState, action: actions.UserActions) {

    const newUserState = {...userState};

    switch(action.type) {
        case actions.REQUEST_GET_NEW_USER:
            newUserState.signedInUser = {} as User;
            return newUserState;
        case actions.REQUEST_GET_EXISTING_USER:
            newUserState.signedInUser = {} as User;
            return newUserState; 
        case actions.GET_USER_SUCCESS:
            const getUserSuccessAction = action as actions.GetUserSuccess;
            newUserState.signedInUser = getUserSuccessAction.payload;            
            return newUserState;   
        case actions.LOG_OUT_USER:
            newUserState.signedInUser = {} as User;
            return newUserState;    
        default:
            return userState;        
    }
}

export const initialUserState = {
    signedInUser: {} as User
}