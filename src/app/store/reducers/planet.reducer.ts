import * as actions from '../actions';
import { Planet } from 'src/app/models/planet';

export function planetReducer(state = initialPlanetState, action: actions.PlanetActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.REQUEST_GET_PLANETS:
            newState.allPlanets = [];
            return newState;

        case actions.GET_PLANETS_SUCCESS:
            const getPlanetsSuccessAction = action as actions.GetPlanetsSuccess;
            newState.allPlanets = [...newState.allPlanets, getPlanetsSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_SELECTED_PLANET:
            newState.currentPlanet = {} as Planet;
            newState.fetchedCurrentPlanet = false;
            return newState;

        case actions.REQUEST_GET_DEFAULT_PLANET:
            newState.currentPlanet = {} as Planet;
            newState.fetchedCurrentPlanet = false;
            return newState;

        case actions.GET_PLANET_SUCCESS:
            const getPlanetSuccessAction = action as actions.GetPlanetSuccess;
            newState.currentPlanet = getPlanetSuccessAction.payload;
            newState.fetchedCurrentPlanet = true;
            return newState;

        case actions.CLEAR_PLANET_STATE:
            newState.allPlanets = [];
            newState.currentPlanet = {} as Planet;
            newState.fetchedCurrentPlanet = false;
            return newState;

        default:
            return state;
    }
}

export const initialPlanetState = {
    allPlanets: [],
    currentPlanet: {} as Planet,
    fetchedCurrentPlanet: false
};
