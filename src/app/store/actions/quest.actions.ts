import { Action } from "@ngrx/store";
import { Quest } from "src/app/models/quest";

export const REQUEST_IN_PROGRESS_QUEST_EXISTS = "[quest] REQUEST_IN_PROGRESS_QUEST_EXISTS";
export const REQUEST_GET_IN_PROGRESS_QUEST = "[quest] REQUEST_GET_IN_PROGRESS_QUEST";
export const GET_QUEST_SUCCESS = "[quest] GET_QUEST_SUCCESS";
export const NO_IN_PROGRESS_QUEST = "[quest] NO_IN_PROGRESS_QUEST";
export const CLEAR_QUEST_STATE = "[logout] CLEAR_QUEST_STATE";

export class RequestInProgressQuestExists implements Action {
    type = REQUEST_IN_PROGRESS_QUEST_EXISTS;
    constructor(public planetNamePayload: string, public userIdPayload: string) {}
}

export class RequestGetInProgressQuest implements Action {
    type = REQUEST_GET_IN_PROGRESS_QUEST;
    constructor() {}
}

export class GetQuestSuccess implements Action {
    type = GET_QUEST_SUCCESS;
    constructor(public payload: Quest)  {}
}

export class NoInProgressQuest implements Action {
    type = NO_IN_PROGRESS_QUEST;
    constructor() {}
}

export class ClearQuestState implements Action {
    type = CLEAR_QUEST_STATE;
    constructor() {}
}

export type QuestActions = 
    | RequestInProgressQuestExists
    | RequestGetInProgressQuest
    | GetQuestSuccess
    | NoInProgressQuest
    | ClearQuestState