import { AppState } from '../app-state';

export const commentBase = (state: AppState) => state.commentState;

export const allComments = (state: AppState) => commentBase(state).allComments;
