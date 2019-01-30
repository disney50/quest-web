import { AppState } from '../app-state';

export const explorerBase = (state: AppState) => state.explorerState;

export const currentExplorer = (state: AppState) => explorerBase(state).currentExplorer;
