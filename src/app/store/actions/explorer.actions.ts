import { Action } from "@ngrx/store";
import { Explorer } from "src/app/models/explorer";

export const REQUEST_GET_EXPLORER = "[exlorer] REQUEST_GET_EXPLORER";
export const GET_EXPLORER_SUCCESS = "[explorer] GET_EXLORER_SUCCESS";

export class RequestGetExplorer implements Action {
    type = REQUEST_GET_EXPLORER;
    constructor() {}
}

export class GetExplorerSuccess implements Action {
    type = GET_EXPLORER_SUCCESS;
    constructor(public payload: Explorer) {}
}

export type ExplorerActions = 
    | RequestGetExplorer
    | GetExplorerSuccess