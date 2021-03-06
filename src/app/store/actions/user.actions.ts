import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { LoginDetails } from 'src/app/models/login-details';

export const REQUEST_GET_MODERATOR_BY_LOGIN_DETAILS = '[moderator] REQUEST_GET_MODERATOR_BY_LOGIN_DETAILS';
export const LOGIN_MODERATOR_SUCCESS = '[moderator] LOGIN_MODERATOR_SUCCESS';


export const REQUEST_USER_EXISTS_USERS = '[login] REQUEST_USER_EXISTS_USERS';
export const REQUEST_USER_EXISTS_EXPLORERS = '[login] REQUEST_USER_EXISTS_EXPLORERS';
export const REQUEST_LOGIN_USER_PASSWORD_EXISTS = '[login] REQUEST_LOGIN_USER_PASSWORD_EXISTS';
export const REQUEST_GET_USER_BY_LOGIN_DETAILS = '[login] REQUEST_GET_USER_BY_LOGIN_DETAILS';
export const LOGIN_SUCCESS = '[login] LOGIN_SUCCESS';
export const LOGIN_FAILED = '[login] LOGIN_FAILED';
export const GET_USER_SUCCESS = '[user] GET_USER_SUCCESS';
export const LOG_OUT_USER = '[logout] LOG_OUT_USER';
export const CLEAR_USER_STATE = '[logout] CLEAR_USER_STATE';
export const UNIMPLEMENTED_ACTION = 'UNIMPLEMENTED_ACTION';

export class RequestGetModeratorByLoginDetails implements Action {
    type = REQUEST_GET_MODERATOR_BY_LOGIN_DETAILS;
    constructor(public payload: LoginDetails) { }
}

export class LoginModeratorSuccess implements Action {
    type = LOGIN_MODERATOR_SUCCESS;
    constructor(public payload: User) { }
}

export class RequestUserExistsUsers implements Action {
    type = REQUEST_USER_EXISTS_USERS;
    constructor(public payload: LoginDetails) { }
}

export class RequestUserExistsExplorers implements Action {
    type = REQUEST_USER_EXISTS_EXPLORERS;
    constructor() { }
}

export class RequestLoginUserPasswordExists implements Action {
    type = REQUEST_LOGIN_USER_PASSWORD_EXISTS;
    constructor() { }
}

export class RequestGetUserByLoginDetails implements Action {
    type = REQUEST_GET_USER_BY_LOGIN_DETAILS;
    constructor() { }
}

export class LoginSuccess implements Action {
    type = LOGIN_SUCCESS;
    constructor(public payload: User) { }
}

export class LoginFailed implements Action {
    type = LOGIN_FAILED;
    constructor() { }
}

export class GetUserSuccess implements Action {
    type = GET_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class LogOutUser implements Action {
    type = LOG_OUT_USER;
    constructor() { }
}

export class ClearUserState implements Action {
    type = CLEAR_USER_STATE;
    constructor() { }
}

export class UnimplementedAction implements Action {
    type = UNIMPLEMENTED_ACTION;
    constructor(public payload: string) { }
}

export type UserActions =
    | RequestUserExistsUsers
    | RequestUserExistsExplorers
    | RequestGetUserByLoginDetails
    | GetUserSuccess
    | LoginSuccess
    | LoginFailed
    | LogOutUser
    | ClearUserState
    | UnimplementedAction;
