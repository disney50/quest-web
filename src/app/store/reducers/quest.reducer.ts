import * as actions from '../actions';
import { Quest } from 'src/app/models/quest';

export function questReducer(state = initialQuestState, action: actions.QuestActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.GET_QUEST_SUCCESS:
            const getQuestSuccessAction = action as actions.GetQuestSuccess;            
            newState.currentQuest = getQuestSuccessAction.payload;
            newState.currentQuestExists = true;
            console.log(newState.currentQuest);
            console.log(newState.currentQuestExists);

            return newState;
        case actions.NO_CURRENT_QUEST:
            newState.currentQuestExists = false;   
            console.log(newState.currentQuest);
            console.log(newState.currentQuestExists);

            return newState;
        case actions.CLEAR_QUEST_STATE:                        
            newState.currentQuest = {} as Quest;            
            newState.currentQuestExists = false;  
            console.log(newState.currentQuest);
            console.log(newState.currentQuestExists);

            return newState;  
        default:
            console.log(state.currentQuest);
            console.log(state.currentQuestExists);

            return state;    
    }
}

export const initialQuestState = {
    currentQuest: {} as Quest,
    currentQuestExists: false
}