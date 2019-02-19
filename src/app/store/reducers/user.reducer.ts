import * as actions from '../actions';
import { User } from 'src/app/models/user';

export function userReducer(state = initialUserState, action: actions.UserActions) {

    const newState = { ...state };

    switch (action.type) {
        case actions.LOGIN_MODERATOR_SUCCESS:
            newState.signedInUser = (action as actions.LoginModeratorSuccess).payload;
            newState.moderatorSignedIn = true;
            newState.userSignedIn = false;
            newState.loginFailed = false;
            return newState;

        case actions.REQUEST_USER_EXISTS_USERS:
            newState.loginFailed = false;
            return newState;

        case actions.REQUEST_USER_EXISTS_EXPLORERS:
            newState.loginFailed = false;
            return newState;

        case actions.LOGIN_SUCCESS:
            newState.signedInUser = (action as actions.LoginSuccess).payload;
            newState.userSignedIn = true;
            newState.moderatorSignedIn = false;
            newState.loginFailed = false;
            return newState;

        case actions.LOGIN_FAILED:
            newState.signedInUser = {} as User;
            newState.loginFailed = true;
            return newState;

        case actions.CLEAR_USER_STATE:
            newState.signedInUser = {} as User;
            newState.userSignedIn = false;
            newState.moderatorSignedIn = false;
            newState.loginFailed = false;
            return newState;

        default:
            return state;
    }
}

export const initialUserState = {
    signedInUser: {} as User,
    userSignedIn: false,
    moderatorSignedIn: false,
    loginFailed: false
};
