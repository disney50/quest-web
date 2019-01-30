import { AppState } from '../app-state';

export const questBase = (state: AppState) => state.questState;

export const planetQuests = (state: AppState) => questBase(state).planetQuests;

export const fetchedPlanetQuests = (state: AppState) => questBase(state).fetchedPlanetQuests;

export const explorerQuests = (state: AppState) => questBase(state).explorerQuests;

export const fetchedExplorerQuests = (state: AppState) => questBase(state).fetchedExplorerQuests;

export const currentQuest = (state: AppState)  => questBase(state).currentQuest;

export const fetchedCurrentQuest = (state: AppState) => questBase(state).fetchedCurrentQuest;

export const currentQuestExists = (state: AppState) => questBase(state).currentQuestExists;

export const selectedQuest = (state: AppState) => questBase(state).selectedQuest;
