import * as actions from '../actions';
import { Explorer } from 'src/app/models/explorer';

export const initialExplorerState = {
    planetExplorers: [],
    currentExplorer: {} as Explorer,
    selectedExplorer: {} as Explorer,
    explorersRequiringModeratorAction: [],
    explorersRequiringModeration: []
};

export function explorerReducer(state = initialExplorerState, action: actions.ExplorerActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.REQUEST_GET_EXPLORER:
            newState.currentExplorer = {} as Explorer;
            return newState;

        case actions.GET_EXPLORER_SUCCESS:
            const getExplorerSuccessAction = action as actions.GetExplorerSuccess;
            newState.currentExplorer = getExplorerSuccessAction.payload;
            return newState;

        case actions.REQUEST_GET_EXPLORERS:
            newState.planetExplorers = [];
            return newState;

        case actions.GET_EXPLORERS_SUCCESS:
            const getExplorersSuccessAction = action as actions.GetExplorersSuccess;
            newState.planetExplorers = [...newState.planetExplorers, getExplorersSuccessAction.payload];
            return newState;

        case actions.GET_SELECTED_EXPLORER_SUCCESS:
            newState.selectedExplorer = (action as actions.GetSelectedExplorerSuccess).payload;
            return newState;

        case actions.GET_EXPLORERS_REQUIRING_MODERATOR_ACTION_SUCCESS:
            newState.explorersRequiringModeratorAction = (action as actions.GetExplorersRequiringModeratorActionSuccess).payload;
            return newState;

        case actions.GET_EXPLORER_REQUIRING_MODERATION_SUCCESS:
            newState.explorersRequiringModeration = (action as actions.GetExplorerRequiringModerationSuccess).payload;
            return newState;

        case actions.CLEAR_EXPLORER_STATE:
            newState.planetExplorers = [];
            newState.currentExplorer = {} as Explorer;
            newState.selectedExplorer = {} as Explorer;
            newState.explorersRequiringModeratorAction = [];
            newState.explorersRequiringModeration = [];
            return newState;

        default:
            return state;
    }
}

