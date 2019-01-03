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

        case actions.NO_CURRENT_QUEST:
            newState.currentQuestExists = false;   
            return newState;

        case actions.REQUEST_GET_PLANET_QUESTS:
            newState.planetQuests = [];
            return newState;    

        case actions.GET_PLANET_QUESTS_SUCCESS:
            const getPlanetQuestsSuccessAction = action as actions.GetPlanetQuestsSuccess;
            newState.planetQuests = [...newState.planetQuests, getPlanetQuestsSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_EXPLORER_QUESTS:
            newState.explorerQuests = [];
            newState.explorerQuestsExist = false;
            return newState;    

        case actions.GET_EXPLORER_QUESTS_SUCCESS:
            newState.explorerQuestsExist = true;
            const getExplorerQuestsSuccessAction = action as actions.GetPlanetQuestsSuccess;
            newState.explorerQuests = [...newState.explorerQuests, getExplorerQuestsSuccessAction.payload];
            return newState; 
            
        case actions.NO_EXPLORER_QUESTS:
            newState.explorerQuestsExist = false;
            return newState;  
            
        case actions.GET_SELECTED_QUEST_SUCCESS:
            const getSelectedQuestAction = action as actions.GetSelectedQuestSuccess;
            newState.selectedQuest = getSelectedQuestAction.payload;
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
    explorerQuests: [],
    explorerQuestsExist: false,
    currentQuest: {} as Quest,
    currentQuestExists: false,
    selectedQuest: {} as Quest
}