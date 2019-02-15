import { AppState } from '../app-state';

export const explorerBase = (state: AppState) => state.explorerState;

export const planetExplorers = (state: AppState) => explorerBase(state).planetExplorers;

export const currentExplorer = (state: AppState) => explorerBase(state).currentExplorer;
