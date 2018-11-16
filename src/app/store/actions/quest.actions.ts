import { Action } from "@ngrx/store";
import { Quest } from "src/app/models/quest";

export const REQUEST_GET_CURRENT_QUEST = "[quest] REQUEST_GET_CURRENT_QUEST";
export const GET_QUEST_SUCCESS = "[quest] GET_QUEST_SUCCESS";

export class RequestGetCurrentQuest implements Action {
    type = REQUEST_GET_CURRENT_QUEST;
    constructor(public planetNamePayload: string, public userIdPayload: string) {}
}

export class GetQuestSuccess implements Action {
    type = GET_QUEST_SUCCESS;
    constructor(public payload: Quest)  {}
}

export type QuestActions = 
    | RequestGetCurrentQuest
    | GetQuestSuccess