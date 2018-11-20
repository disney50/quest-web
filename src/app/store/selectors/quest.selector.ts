import { AppState } from '../app-state';

export const questBase = (state: AppState) => state.questState;

export const currentQuest = (state: AppState)  => questBase(state).currentQuest;

export const noCurrentQuest = (state: AppState) => questBase(state).noCurrentQuest;