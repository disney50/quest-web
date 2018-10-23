import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const GET_USER = "[user] GET_USER"
export const GET_USER_SUCCESS = "[user] GET_QUEST_USER_SUCCESS";
export const UNIMPLEMENTED_ACTION = "[user] UNIMPLEMENTED_ACTION"

export class GetUser implements Action {
    type = GET_USER;
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
    | GetUser
    | GetUserSuccess
    | UnimplementedAction