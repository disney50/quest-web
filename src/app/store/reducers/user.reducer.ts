import * as actions from '../actions';
import { User } from 'src/app/models/user';

export function userReducer(userState = initialUserState, action: actions.UserActions) {

    const newUserState = {...userState};

    switch (action.type) {
        case actions.REQUEST_LOGIN_USER_EXIST:
            newUserState.loginFailed = false;
            return newUserState;
        case actions.LOGIN_SUCCESS:
            newUserState.signedInUser = (action as actions.LoginSuccess).payload;
            newUserState.signedIn = true;
            newUserState.loginFailed = false;
            return newUserState;
        case actions.LOGIN_FAILED:
            newUserState.signedInUser = {} as User;
            newUserState.loginFailed = true;
            return newUserState;    
        case actions.GET_USER_SUCCESS:
            const getUserSuccessAction = action as actions.GetUserSuccess;
            newUserState.signedInUser = getUserSuccessAction.payload;
            newUserState.signedIn = true;
            newUserState.loginFailed = false;
            return newUserState;
        case actions.CLEAR_USER_STATE:
            newUserState.signedInUser = {} as User;
            newUserState.signedIn = false;
            newUserState.loginFailed = false;
            return newUserState;
        default:
            return userState;
    }
}

export const initialUserState = {
    signedInUser: {} as User,
    signedIn: false,
    loginFailed: false
};
