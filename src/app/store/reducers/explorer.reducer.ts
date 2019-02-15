import * as actions from '../actions';
import { Explorer } from 'src/app/models/explorer';

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

        case actions.CLEAR_EXPLORER_STATE:
            newState.currentExplorer = {} as Explorer;
            return newState;

        default:
            return state;
    }
}

export const initialExplorerState = {
    planetExplorers: [],
    currentExplorer: {} as Explorer
};
