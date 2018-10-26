import * as actions from '../actions';

export function planetReducer(state = initialPlanetState, action: actions.PlanetActions) {
    const newState = {...state};

    switch(action.type) {
        case actions.REQUEST_GET_PLANETS:
            newState.planets = [];
            return newState;
        case actions.GET_PLANET_SUCCESS:
            const getPlanetSuccessAction = action as actions.GetPlanetSuccess;
            newState.planets = [...newState.planets, getPlanetSuccessAction.payload];
            return newState;
        default:
            return state;       
    }
}

export const initialPlanetState = {
    planets: []
}