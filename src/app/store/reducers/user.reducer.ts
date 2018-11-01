import * as actions from '../actions';
import { User } from 'src/app/models/user';

export function userReducer(state = intitialUserState, action: actions.UserActions) {

    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_SIGNED_IN_USER:
            newState.signedInUser = {} as User;
            return newState;
        case actions.REQUEST_USER_SIGN_IN:
            newState.users = [];
            return newState; 
        case actions.GET_SIGNED_IN_USER_SUCCESS:
            const getUserSuccessAction = action as actions.GetSignedInUserSuccess;
            newState.signedInUser = getUserSuccessAction.payload;
            return newState;
        case actions.USER_SIGN_IN_SUCCESS:
            const userSignInSuccessAction = action as actions.UserSignInSuccess;
            newState.users = [...newState.users, userSignInSuccessAction.payload];
            return newState;    
        case actions.REMOVE_SIGNED_IN_USER:
            newState.signedInUser = {} as User;
            return newState;    
        default:
            return state;        
    }
}

export const intitialUserState = {
    users: [],
    signedInUser: {} as User
}