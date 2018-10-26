import * as actions from '../actions';

export function explorerReducer(state = initialExplorerState, action: actions.ExplorerActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_EXPLORER:
            newState.explorers = [];
            return newState;
        case actions.GET_EXPLORER_SUCCESS:
            const getExplorerSuccessAction = action as actions.GetExplorerSuccess;
            newState.explorers = [...newState.explorers, getExplorerSuccessAction.payload];
            return newState;
        default:
            return state;       
    }
}

export const initialExplorerState = {
    explorers: []
}