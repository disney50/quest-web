import * as actions from '../actions';
import { Quest } from 'src/app/models/quest';

export function questReducer(state = initialQuestState, action: actions.QuestActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.GET_QUEST_SUCCESS:
            const getQuestSuccessAction = action as actions.GetQuestSuccess;            
            newState.currentQuest = getQuestSuccessAction.payload;
            newState.currentQuestExists = true;
            return newState;

        case actions.NO_IN_PROGRESS_QUEST:
            newState.currentQuestExists = false;   
            return newState;

        case actions.REQUEST_GET_PLANET_QUESTS:
            newState.planetQuests = [];
            return newState;    

        case actions.GET_PLANET_QUESTS_SUCCESS:
            const getPlanetQuestsSuccessAction = action as actions.GetPlanetQuestsSuccess;
            newState.planetQuests = [...newState.planetQuests, getPlanetQuestsSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_INTERACTED_QUESTS:
            newState.interactedQuests = [];
            newState.interactedQuestExists = false;
            return newState;    

        case actions.GET_INTERACTED_QUESTS_SUCCESS:
            newState.interactedQuestExists = true;
            const getInteractedQuestsSuccessAction = action as actions.GetPlanetQuestsSuccess;
            newState.interactedQuests = [...newState.interactedQuests, getInteractedQuestsSuccessAction.payload];
            return newState; 
            
        case actions.NO_IN_INTERACTED_QUEST:
            newState.interactedQuestExists = false;
            return newState;    

        case actions.CLEAR_QUEST_STATE:                        
            newState.currentQuest = {} as Quest;            
            newState.currentQuestExists = false;  
            return newState;  

        default:
            return state;    
    }
}

export const initialQuestState = {
    planetQuests: [],
    interactedQuests: [],
    interactedQuestExists: false,
    currentQuest: {} as Quest,
    currentQuestExists: false
}