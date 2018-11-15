import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { LoginDetails } from 'src/app/models/login-details';

export const REQUEST_LOGIN_USER_EXIST = "[login] REQUEST_LOGIN_USER_EXIST";
export const REQUEST_GET_USER_BY_ID = "[user] REQUEST_GET_USER_BY_ID"
export const REQUEST_GET_USER_BY_LOGIN_DETAILS = "[login] REQUEST_GET_USER_BY_LOGIN_DETAILS";
export const GET_USER_SUCCESS = "[user] GET_USER_SUCCESS";
export const LOGIN_SUCCESS = "[login] LOGIN_SUCCESS";
export const LOGIN_FAILED = "[login] LOGIN_FAILED";
export const LOG_OUT_USER = "[user] LOG_OUT_USER";
export const UNIMPLEMENTED_ACTION = "[user] UNIMPLEMENTED_ACTION"

export class RequestLoginUserExist implements Action {
    type = REQUEST_LOGIN_USER_EXIST;
    constructor(public payload: LoginDetails) {}
}

export class RequestGetUserById implements Action {
    type = REQUEST_GET_USER_BY_ID;
    constructor(public payload: string) {}
}

export class GetUserSuccess implements Action {
    type = GET_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class RequestGetUserByLoginDetails implements Action {
  type = REQUEST_GET_USER_BY_LOGIN_DETAILS;
  constructor(public payload: LoginDetails) {}
}

export class LoginSuccess implements Action {
  type = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginFailed implements Action {
  type = LOGIN_FAILED;
  constructor() {}
}

export class LogOutUser implements Action {
    type = LOG_OUT_USER;
    constructor() {}
}

export class UnimplementedAction implements Action {
    type = UNIMPLEMENTED_ACTION;
    constructor(public payload: string) {}
}

export type UserActions = 
    | RequestLoginUserExist
    | RequestGetUserById
    | RequestGetUserByLoginDetails
    | GetUserSuccess
    | LoginSuccess
    | LoginFailed
    | LogOutUser
    | UnimplementedAction
