import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const REQUEST_GET_SIGNED_IN_USER = "[user] REQUEST_GET_SIGNED_IN_USER"
export const GET_SIGNED_IN_USER_SUCCESS = "[user] GET_USER_SUCCESS";
export const REQUEST_USER_SIGN_IN = "[user] REQUEST_USER_SIGN_IN";
export const USER_SIGN_IN_SUCCESS = "[user] USER_SIGN_IN_SUCCESS";
export const REMOVE_SIGNED_IN_USER = "[user] REMOVE_SIGNED_IN_USER";
export const UNIMPLEMENTED_ACTION = "[user] UNIMPLEMENTED_ACTION"

export class RequestGetSignedInUser implements Action {
    type = REQUEST_GET_SIGNED_IN_USER;
    constructor() {}
}

export class GetSignedInUserSuccess implements Action {
    type = GET_SIGNED_IN_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class RequestUserSignIn implements Action {
    type = REQUEST_USER_SIGN_IN;
    constructor() {}
}

export class UserSignInSuccess implements Action {
    type = USER_SIGN_IN_SUCCESS;
    constructor(public payload: User) {}
}

export class RemoveSignedInUser implements Action {
    type = REMOVE_SIGNED_IN_USER;
    constructor() {}
}

export class UnimplementedAction implements Action {
    type = UNIMPLEMENTED_ACTION;
    constructor(public payload: string) {}
}

export type UserActions = 
    | RequestGetSignedInUser
    | GetSignedInUserSuccess
    | RequestUserSignIn
    | UserSignInSuccess
    | RemoveSignedInUser
    | UnimplementedAction