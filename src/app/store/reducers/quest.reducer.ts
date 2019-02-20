import * as actions from '../actions';
import { Quest } from 'src/app/models/quest';

export const initialQuestState = {
    planetQuests: [],
    fetchedPlanetQuests: false,
    explorerQuests: [],
    fetchedExplorerQuests: false,
    currentQuest: {} as Quest,
    fetchedCurrentQuest: false,
    currentQuestExists: false,
    selectedQuest: {} as Quest,
    questsWithNewComments: []
};

export function questReducer(state = initialQuestState, action: actions.QuestActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.GET_QUEST_SUCCESS:
            const getQuestSuccessAction = action as actions.GetQuestSuccess;
            newState.currentQuest = getQuestSuccessAction.payload;
            newState.currentQuestExists = true;
            newState.fetchedCurrentQuest = true;
            return newState;

        case actions.NO_CURRENT_QUEST:
            newState.currentQuestExists = false;
            return newState;

        case actions.REQUEST_GET_PLANET_QUESTS:
            newState.planetQuests = [];
            newState.fetchedPlanetQuests = false;
            return newState;

        case actions.GET_PLANET_QUESTS_SUCCESS:
            const getPlanetQuestsSuccessAction = action as actions.GetPlanetQuestsSuccess;
            newState.planetQuests = [...newState.planetQuests, getPlanetQuestsSuccessAction.payload];
            newState.fetchedPlanetQuests = true;
            return newState;

        case actions.REQUEST_GET_EXPLORER_QUESTS:
            newState.explorerQuests = [];
            newState.fetchedExplorerQuests = false;
            return newState;

        case actions.GET_EXPLORER_QUESTS_SUCCESS:
            const getExplorerQuestsSuccessAction = action as actions.GetPlanetQuestsSuccess;
            newState.explorerQuests = [...newState.explorerQuests, getExplorerQuestsSuccessAction.payload];
            newState.fetchedExplorerQuests = true;
            return newState;

        case actions.GET_SELECTED_QUEST_SUCCESS:
            const getSelectedQuestAction = action as actions.GetSelectedQuestSuccess;
            newState.selectedQuest = getSelectedQuestAction.payload;
            return newState;

        case actions.GET_QUESTS_WITH_NEW_COMMENTS_SUCCESS:
            newState.questsWithNewComments = (action as actions.GetQuestsWithNewCommentsSuccess).payload;
            return newState;

        case actions.CLEAR_QUEST_STATE:
            newState.planetQuests = [];
            newState.fetchedPlanetQuests = false;
            newState.explorerQuests = [];
            newState.fetchedExplorerQuests = false;
            newState.currentQuest = {} as Quest;
            newState.fetchedCurrentQuest = false;
            newState.currentQuestExists = false;
            newState.selectedQuest = {} as Quest;
            newState.questsWithNewComments = [];
            return newState;

        default:
            return state;
    }
}
