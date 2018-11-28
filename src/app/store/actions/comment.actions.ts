import { Action } from "@ngrx/store";
import { Comment } from "src/app/models/comment";

export const REQUEST_GET_ALL_COMMENTS = "[comment] REQUEST_GET_ALL_COMMENTS";
export const GET_COMMENT_SUCCESS = "[comment] GET_COMMENT_SUCCESS";
export const CLEAR_COMMENT_STATE = "[logout] CLEAR_COMMENT_STATE";

export class RequestGetAllComments implements Action {
    type = REQUEST_GET_ALL_COMMENTS;
    constructor(public planetNamePayload: string, public userIdPayload: string, public questIdPayload: string) {}
}

export class GetCommentSuccess implements Action {
    type = GET_COMMENT_SUCCESS;
    constructor(public payload: Comment) {}
}

export class ClearCommentState implements Action {
    type = CLEAR_COMMENT_STATE;
    constructor() {}
}

export type CommentActions = 
    | RequestGetAllComments
    | GetCommentSuccess
    | ClearCommentState