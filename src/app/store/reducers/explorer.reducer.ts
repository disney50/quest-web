import * as actions from '../actions';

export function explorerReducer(state = initialExplorerState, action: actions.ExplorerActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_CURRENT_EXPLORER:
            newState.currentExplorer = null;
            return newState;
        case actions.GET_CURRENT_EXPLORER_SUCCESS:
            const getCurrentExplorerSuccessAction = action as actions.GetCurrentExplorerSuccess;
            newState.currentExplorer = getCurrentExplorerSuccessAction.payload;
            console.log(getCurrentExplorerSuccessAction.payload);
            return newState;
        default:
            return state;       
    }
}

export const initialExplorerState = {
    currentExplorer: null
}