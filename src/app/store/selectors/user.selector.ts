import { AppState } from '../app-state';

export const userBase = (state: AppState) => state.userState;

export const signedInUser = (state: AppState) => userBase(state).signedInUser;

export const userSignedIn = (state: AppState) => userBase(state).userSignedIn;

export const moderatorSignedIn = (state: AppState) => userBase(state).moderatorSignedIn;

export const loginFailed = (state: AppState) => userBase(state).loginFailed;
