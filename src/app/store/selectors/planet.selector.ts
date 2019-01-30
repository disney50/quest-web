import { AppState } from '../app-state';

export const planetBase = (state: AppState) => state.planetState;

export const allPlanets = (state: AppState) => planetBase(state).allPlanets;

export const currentPlanet = (state: AppState) => planetBase(state).currentPlanet;

export const fetchedCurrentPlanet = (state: AppState) => planetBase(state).fetchedCurrentPlanet;
