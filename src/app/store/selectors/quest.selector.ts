import { AppState } from '../app-state';

export const questBase = (state: AppState) => state.questState;

export const currentQuest = (state: AppState)  => questBase(state).currentQuest;

export const currentQuestExists = (state: AppState) => questBase(state).currentQuestExists;