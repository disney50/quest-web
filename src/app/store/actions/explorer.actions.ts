import { Action } from "@ngrx/store";
import { Explorer } from "src/app/models/explorer";

export const REQUEST_GET_CURRENT_EXPLORER = "[explorer] REQUEST_GET_CURRENT_EXPLORER";
export const GET_CURRENT_EXPLORER_SUCCESS = "[explorer] GET_CURRENT_EXPLORER_SUCCESS";

export class RequestGetCurrentExplorer implements Action {
    type = REQUEST_GET_CURRENT_EXPLORER
    constructor() {}
}

export class GetCurrentExplorerSuccess implements Action {
    type = GET_CURRENT_EXPLORER_SUCCESS
    constructor(public payload: Explorer) {}
}

export type ExplorerActions = 
    | RequestGetCurrentExplorer
    | GetCurrentExplorerSuccess