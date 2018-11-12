import { AppState } from '../app-state';

export const base = (state: AppState) => state.userState;

export const hasLoginFailed = (state: AppState) =>  base(state).loginFailed;

export const hasLoginSucceeded = (state: AppState) => base(state).signedIn;

export const signedInUser = (state: AppState) => base(state).signedInUser;
