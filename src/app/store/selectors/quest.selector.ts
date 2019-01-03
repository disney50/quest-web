import { AppState } from '../app-state';

export const questBase = (state: AppState) => state.questState;

export const planetQuests = (state: AppState) => questBase(state).planetQuests;

export const explorerQuests = (state: AppState) => questBase(state).explorerQuests;

export const explorerQuestsExist = (state: AppState) => questBase(state).explorerQuestsExist;

export const currentQuest = (state: AppState)  => questBase(state).currentQuest;

export const currentQuestExists = (state: AppState) => questBase(state).currentQuestExists;

export const selectedQuest = (state: AppState) => questBase(state).selectedQuest;