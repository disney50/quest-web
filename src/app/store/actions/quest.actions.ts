import { Action } from "@ngrx/store";
import { Quest } from "src/app/models/quest";

export const REQUEST_GET_IN_PROGRESS_QUEST = "[quest] REQUEST_GET_IN_PROGRESS_QUEST";
export const GET_QUEST_SUCCESS = "[quest] GET_QUEST_SUCCESS";

export class RequestGetInProgressQuest implements Action {
    type = REQUEST_GET_IN_PROGRESS_QUEST;
    constructor() {}
}

export class GetQuestSuccess implements Action {
    type = GET_QUEST_SUCCESS;
    constructor(public payload: Quest)  {}
}

export type QuestActions = 
    | RequestGetInProgressQuest
    | GetQuestSuccess