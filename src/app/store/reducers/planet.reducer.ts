import * as actions from '../actions';
import { Planet } from 'src/app/models/planet';

export function planetReducer(state = initialPlanetState, action: actions.PlanetActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_PLANETS:
            newState.planets = [];
            return newState;
        case actions.REQUEST_GET_CURRENT_PLANET:
            newState.currentPlanet = {} as Planet;
            return newState;
        case actions.REQUEST_GET_USER_PLANET:
            newState.currentPlanet = {} as Planet;
            return newState;
        case actions.GET_PLANETS_SUCCESS:
            const getPlanetsSuccessAction = action as actions.GetPlanetsSuccess;
            newState.planets = [...newState.planets, getPlanetsSuccessAction.payload];
            return newState;            
        case actions.GET_PLANET_SUCCESS:
            const getPlanetSuccessAction = action as actions.GetPlanetSuccess;
            newState.currentPlanet = getPlanetSuccessAction.payload;
            return newState;  
        default:
            return state;       
    }
}

export const initialPlanetState = {
    planets: [],
    currentPlanet: {} as Planet
}