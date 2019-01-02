import { Action } from "@ngrx/store";
import { Quest } from "src/app/models/quest";

export const REQUEST_IN_PROGRESS_QUEST_EXISTS = "[quest] REQUEST_IN_PROGRESS_QUEST_EXISTS";
export const REQUEST_GET_IN_PROGRESS_QUEST = "[quest] REQUEST_GET_IN_PROGRESS_QUEST";
export const REQUEST_MODERATING_QUEST_EXISTS = "[quest] REQUEST_MODERATING_QUEST_EXISTS";
export const REQUEST_GET_MODERATING_QUEST = "[quest] REQUEST_GET_MODERATING_QUEST";
export const GET_QUEST_SUCCESS = "[quest] GET_QUEST_SUCCESS";
export const NO_CURRENT_QUEST = "[quest] NO_CURRENT_QUEST";
export const REQUEST_GET_PLANET_QUESTS = "[quest] REQUEST_GET_PLANET_QUESTS";
export const GET_PLANET_QUESTS_SUCCESS = "[quest] GET_PLANET_QUESTS_SUCCESS";
export const REQUEST_INTERACTED_QUEST_EXISTS = "[quest] REQUEST_INTERACTED_QUEST_EXISTS";
export const REQUEST_GET_INTERACTED_QUESTS = "[quest] REQUEST_GET_INTERACTED_QUESTS";
export const GET_INTERACTED_QUESTS_SUCCESS = "[quest] GET_INTERACTED_QUESTS_SUCCESS";
export const NO_IN_INTERACTED_QUEST = "[quest] NO_IN_INTERACTED_QUEST";
export const REQUEST_GET_SELECTED_QUEST = "[quest] REQUEST_GET_SELECTED_QUEST";
export const GET_SELECTED_QUEST = "[quest] GET_SELECTED_QUEST";
export const CLEAR_QUEST_STATE = "[logout] CLEAR_QUEST_STATE";

export class RequestInProgressQuestExists implements Action {
    type = REQUEST_IN_PROGRESS_QUEST_EXISTS;
    constructor(public planetNamePayload: string, public userIdPayload: string) {}
}

export class RequestGetInProgressQuest implements Action {
    type = REQUEST_GET_IN_PROGRESS_QUEST;
    constructor() {}
}

export class RequestModeratingQuestExists implements Action {
    type = REQUEST_GET_MODERATING_QUEST;
    constructor() {}
}

export class RequestGetModeratingQuest implements Action {
    type = REQUEST_GET_MODERATING_QUEST;
    constructor() {}
}

export class GetQuestSuccess implements Action {
    type = GET_QUEST_SUCCESS;
    constructor(public payload: Quest)  {}
}

export class NoCurrentQuest implements Action {
    type = NO_CURRENT_QUEST;
    constructor() {}
}

export class RequestGetPlanetQuests implements Action {
    type = REQUEST_GET_PLANET_QUESTS;
    constructor(public payload: string) {}
}

export class GetPlanetQuestsSuccess implements Action {
    type = GET_PLANET_QUESTS_SUCCESS;
    constructor(public payload: Quest) {}
}

export class RequestInteractedQuestExists implements Action {
    type = REQUEST_INTERACTED_QUEST_EXISTS;
    constructor(public planetNamePayload: string, public userIdPayload: string) {}
}

export class RequestGetInteractedQuests implements Action {
    type = REQUEST_GET_INTERACTED_QUESTS;
    constructor(public planetNamePayload: string, public userIdPayload: string) {}
}

export class GetInteractedQuestsSuccess implements Action {
    type = GET_INTERACTED_QUESTS_SUCCESS;
    constructor(public payload: Quest) {}
}

export class NoInInteractedQuest implements Action {
    type = NO_IN_INTERACTED_QUEST;
    constructor() {}
}

export class RequestGetSelectedQuest implements Action {
    type = REQUEST_GET_SELECTED_QUEST;
    constructor(public planetNamePayload: string, public questIdPayload: string) {}
}

export class GetSelectedQuest implements Action {
    type = GET_SELECTED_QUEST;
    constructor(public payload: Quest) {}
}

export class ClearQuestState implements Action {
    type = CLEAR_QUEST_STATE;
    constructor() {}
}

export type QuestActions = 
    | RequestInProgressQuestExists
    | RequestGetInProgressQuest
    | RequestModeratingQuestExists
    | RequestGetModeratingQuest
    | GetQuestSuccess
    | NoCurrentQuest
    | RequestGetPlanetQuests
    | GetPlanetQuestsSuccess
    | RequestInteractedQuestExists
    | RequestGetInteractedQuests
    | GetInteractedQuestsSuccess
    | NoInInteractedQuest
    | RequestGetSelectedQuest
    | GetSelectedQuest
    | ClearQuestState