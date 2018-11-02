import * as actions from '../actions';
import { Explorer } from 'src/app/models/explorer';

export function explorerReducer(state = initialExplorerState, action: actions.ExplorerActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_CURRENT_EXPLORER:
            newState.currentExplorer = {} as Explorer;
            return newState;
        case actions.GET_EXPLORER_SUCCESS:
            const getExplorerSuccessAction = action as actions.GetExplorerSuccess;
            newState.currentExplorer = getExplorerSuccessAction.payload;
            return newState;
        default:
            return state;       
    }
}

export const initialExplorerState = {
    currentExplorer: {} as Explorer
}