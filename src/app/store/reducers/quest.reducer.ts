import * as actions from '../actions';
import { Quest } from 'src/app/models/quest';

export function questReducer(state = initialQuestState, action: actions.QuestActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.GET_QUEST_SUCCESS:
            const getQuestSuccessAction = action as actions.GetQuestSuccess;
            console.log(getQuestSuccessAction.payload);
            
            newState.currentQuest = getQuestSuccessAction.payload;
            return newState;
        default:
            return state;    
    }
}

export const initialQuestState = {
    currentQuest: {} as Quest
}