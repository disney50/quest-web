import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const REQUEST_GET_SIGNED_IN_USER = "[user] REQUEST_GET_SIGNED_IN_USER"
export const GET_USER_SUCCESS = "[user] GET_USER_SUCCESS";
export const UNIMPLEMENTED_ACTION = "[user] UNIMPLEMENTED_ACTION"

export class RequestGetSignedInUser implements Action {
    type = REQUEST_GET_SIGNED_IN_USER;
    constructor() {}
}

export class  GetUserSuccess implements Action {
    type = GET_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class UnimplementedAction implements Action {
    type = UNIMPLEMENTED_ACTION;
    constructor(public payload: string) {}
}

export type UserActions = 
    | RequestGetSignedInUser
    | GetUserSuccess
    | UnimplementedAction