import * as actions from '../actions';
import { User } from 'src/app/models/user';

export function userReducer(state = initialUserState, action: actions.UserActions) {

    const newState = {...state};

    switch (action.type) {
        case actions.REQUEST_LOGIN_USER_EXIST:
            newState.loginFailed = false;
            console.log(newState);

            return newState;
        case actions.LOGIN_SUCCESS:
            newState.signedInUser = (action as actions.LoginSuccess).payload;
            newState.signedIn = true;
            newState.loginFailed = false;
            console.log(newState.loginFailed);
            console.log(newState.signedIn);
            console.log(newState.signedInUser);

            return newState;
        case actions.LOGIN_FAILED:
            newState.signedInUser = {} as User;
            newState.loginFailed = true;
            console.log(newState.loginFailed);
            console.log(newState.signedIn);
            console.log(newState.signedInUser);

            return newState;    
        case actions.GET_USER_SUCCESS:
            const getUserSuccessAction = action as actions.GetUserSuccess;
            newState.signedInUser = getUserSuccessAction.payload;
            newState.signedIn = true;
            newState.loginFailed = false;
            console.log(newState.loginFailed);
            console.log(newState.signedIn);
            console.log(newState.signedInUser);

            return newState;
        case actions.CLEAR_USER_STATE:
            newState.signedInUser = {} as User;
            newState.signedIn = false;
            newState.loginFailed = false;
            console.log(newState.loginFailed);
            console.log(newState.signedIn);
            console.log(newState.signedInUser);

            return newState;
        default:
            console.log(state.loginFailed);
            console.log(state.signedIn);
            console.log(state.signedInUser);

            return state;
    }
}

export const initialUserState = {
    signedInUser: {} as User,
    signedIn: false,
    loginFailed: false
};
