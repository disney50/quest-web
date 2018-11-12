import { AppState } from '../app-state';

export const base = (state: AppState) => state.userState;

export const hasLoginFailed = (state: AppState) =>  base(state).loginFailed;
