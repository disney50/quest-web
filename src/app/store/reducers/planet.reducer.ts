import * as actions from '../actions';
import { Planet } from 'src/app/models/planet';

export function planetReducer(state = initialPlanetState, action: actions.PlanetActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_ALL_PLANETS:
            newState.allPlanets = [];
            console.log(newState.allPlanets);
            console.log(newState.currentPlanet);

            return newState;
        case actions.GET_ALL_PLANETS_SUCCESS:
            const getPlanetsSuccessAction = action as actions.GetAllPlanetsSuccess;
            newState.allPlanets = [...newState.allPlanets, getPlanetsSuccessAction.payload];
            console.log(newState.allPlanets);
            console.log(newState.currentPlanet);

            return newState;     
        case actions.REQUEST_GET_SELECTED_PLANET:
            newState.currentPlanet = {} as Planet;
            console.log(newState.allPlanets);
            console.log(newState.currentPlanet);

            return newState;
        case actions.REQUEST_GET_DEFAULT_PLANET:
            newState.currentPlanet = {} as Planet;
            console.log(newState.allPlanets);
            console.log(newState.currentPlanet);

            return newState;  
        case actions.GET_PLANET_SUCCESS:
            const getPlanetSuccessAction = action as actions.GetPlanetSuccess;
            newState.currentPlanet = getPlanetSuccessAction.payload;
            console.log(newState.allPlanets);
            console.log(newState.currentPlanet);

            return newState;  
        case actions.CLEAR_PLANET_STATE:
            newState.allPlanets = [];
            newState.currentPlanet = {} as Planet;
            console.log(newState.allPlanets);
            console.log(newState.currentPlanet);

            return newState;    
        default:
            console.log(state.allPlanets);
            console.log(state.currentPlanet);
            
            return state;       
    }
}

export const initialPlanetState = {
    allPlanets: [],
    currentPlanet: {} as Planet
}