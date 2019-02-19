import { Action } from '@ngrx/store';
import { Explorer } from 'src/app/models/explorer';
import { ExplorerWithModeratingQuestsAndQuestsWithNewComments } from 'src/app/models/explorer-with-moderating-quests-and-quests-with-new-comments';

export const REQUEST_GET_EXPLORER = '[explorer] REQUEST_GET_EXPLORER';
export const GET_EXPLORER_SUCCESS = '[explorer] GET_EXPLORER_SUCCESS';
export const REQUEST_GET_EXPLORERS = '[explorer] REQUEST_GET_EXPLORERS';
export const GET_EXPLORERS_SUCCESS = '[explorer] GET_EXPLORERS_SUCCESS';
export const GET_SELECTED_EXPLORER_SUCCESS = '[explorer] GET_SELECTED_EXPLORER_SUCCESS';
export const GET_EXPLORERS_WITH_MODERATING_QUESTS_AND_QUESTS_WITH_NEW_COMMENTS_SUCCESS =
    '[moderator] GET_EXPLORERS_WITH_MODERATING_QUESTS_AND_QUESTS_WITH_NEW_COMMENTS_SUCCESS';
export const CLEAR_EXPLORER_STATE = '[logout] CLEAR_EXPLORER_STATE';

export class RequestGetExplorer implements Action {
    type = REQUEST_GET_EXPLORER;
    constructor(public planetNamePayload: string, public userIdPayload: string) { }
}

export class GetExplorerSuccess implements Action {
    type = GET_EXPLORER_SUCCESS;
    constructor(public payload: Explorer) { }
}

export class RequestGetExplorers implements Action {
    type = REQUEST_GET_EXPLORERS;
    constructor(public payload: string) { }
}

export class GetExplorersSuccess implements Action {
    type = GET_EXPLORERS_SUCCESS;
    constructor(public payload: Explorer) { }
}

export class GetSelectedExplorerSuccess implements Action {
    type = GET_SELECTED_EXPLORER_SUCCESS;
    constructor(public payload: Explorer) { }
}

export class GetExplorersWithModeratingQuestsAndQuestsWithNewComment implements Action {
    type = GET_EXPLORERS_WITH_MODERATING_QUESTS_AND_QUESTS_WITH_NEW_COMMENTS_SUCCESS;
    constructor(public payload: ExplorerWithModeratingQuestsAndQuestsWithNewComments[]) { }
}

export class ClearExplorerState implements Action {
    type = CLEAR_EXPLORER_STATE;
    constructor() { }
}

export type ExplorerActions =
    | RequestGetExplorer
    | GetExplorerSuccess
    | RequestGetExplorers
    | GetExplorersSuccess
    | GetSelectedExplorerSuccess
    | GetExplorersWithModeratingQuestsAndQuestsWithNewComment
    | ClearExplorerState;
