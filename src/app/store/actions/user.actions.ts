import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const REQUEST_GET_NEW_USER = "[user] REQUEST_GET_NEW_USER"
export const REQUEST_GET_EXISTING_USER = "[user] REQUEST_GET_EXISTING_USER";
export const GET_USER_SUCCESS = "[user] GET_USER_SUCCESS";
export const LOG_OUT_USER = "[user] LOG_OUT_USER";
export const UNIMPLEMENTED_ACTION = "[user] UNIMPLEMENTED_ACTION"

export class RequestGetNewUser implements Action {
    type = REQUEST_GET_NEW_USER;
    constructor() {}
}

export class RequestGetExistingUser implements Action {
    type = REQUEST_GET_EXISTING_USER;
    constructor() {}
}

export class GetUserSuccess implements Action {
    type = GET_USER_SUCCESS;
    constructor(public payload: User) {}
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
    | RequestGetNewUser
    | RequestGetExistingUser
    | GetUserSuccess
    | LogOutUser
    | UnimplementedAction