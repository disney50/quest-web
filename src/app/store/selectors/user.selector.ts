import { AppState } from '../app-state';

export const userBase = (state: AppState) => state.userState;

export const hasLoginFailed = (state: AppState) => userBase(state).loginFailed;

export const hasLoginSucceeded = (state: AppState) => userBase(state).signedIn;

export const signedInUser = (state: AppState) => userBase(state).signedInUser;
