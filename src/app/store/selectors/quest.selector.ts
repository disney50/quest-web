import { AppState } from '../app-state';

export const questBase = (state: AppState) => state.questState;

export const planetQuests = (state: AppState) => questBase(state).planetQuests;

export const interactedQuests = (state: AppState) => questBase(state).interactedQuests;

export const currentQuest = (state: AppState)  => questBase(state).currentQuest;

export const currentQuestExists = (state: AppState) => questBase(state).currentQuestExists;