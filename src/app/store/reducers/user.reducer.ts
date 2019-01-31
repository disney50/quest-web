import * as actions from '../actions';
import { User } from 'src/app/models/user';

export function userReducer(state = initialUserState, action: actions.UserActions) {

    const newState = { ...state };

    switch (action.type) {
        case actions.REQUEST_USER_EXISTS_USERS:
            newState.loginFailed = false;
            return newState;

        case actions.REQUEST_USER_EXISTS_EXPLORERS:
            newState.loginFailed = false;
            return newState;

        case actions.LOGIN_SUCCESS:
            newState.signedInUser = (action as actions.LoginSuccess).payload;
            newState.signedIn = true;
            newState.loginFailed = false;
            return newState;

        case actions.LOGIN_FAILED:
            newState.signedInUser = {} as User;
            newState.loginFailed = true;
            return newState;

        case actions.GET_USER_SUCCESS:
            const getUserSuccessAction = action as actions.GetUserSuccess;
            newState.signedInUser = getUserSuccessAction.payload;
            newState.signedIn = true;
            newState.loginFailed = false;
            return newState;

        case actions.CLEAR_USER_STATE:
            newState.signedInUser = {} as User;
            newState.signedIn = false;
            newState.loginFailed = false;
            return newState;

        default:
            return state;
    }
}

export const initialUserState = {
    signedInUser: {} as User,
    signedIn: false,
    loginFailed: false
};
