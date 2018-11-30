import { Action } from "@ngrx/store";
import { Planet } from "src/app/models/planet";

export const REQUEST_GET_PLANETS = "[planet] REQUEST_GET_PLANETS";
export const GET_PLANETS_SUCCESS = "[planet] GET_PLANETS_SUCCESS";
export const REQUEST_GET_SELECTED_PLANET = "[planet] REQUEST_GET_SELECTED_PLANET";
export const REQUEST_GET_DEFAULT_PLANET = "[login] REQUEST_GET_DEFAULT_PLANET";
export const GET_PLANET_SUCCESS = "[planet] GET_PLANET_SUCCESS";
export const CLEAR_PLANET_STATE = "[logout] CLEAR_PLANET_STATE";

export class RequestGetPlanets implements Action {
    type = REQUEST_GET_PLANETS;
    constructor() {}
}

export class GetPlanetsSuccess implements Action {
    type = GET_PLANETS_SUCCESS;
    constructor(public payload: Planet) {}
}

export class RequestGetSelectedPlanet implements Action {
    type = REQUEST_GET_SELECTED_PLANET;
    constructor() {}
}

export class RequestGetDefaultPlanet implements Action {
    type = REQUEST_GET_DEFAULT_PLANET;
    constructor(public payload: string) {}
}

export class GetPlanetSuccess implements Action {
    type = GET_PLANET_SUCCESS;
    constructor(public payload: Planet) {}
}

export class ClearPlanetState implements Action {
    type = CLEAR_PLANET_STATE;
    constructor() {}
}

export type PlanetActions =
    | RequestGetPlanets
    | GetPlanetsSuccess
    | RequestGetSelectedPlanet
    | RequestGetDefaultPlanet
    | GetPlanetSuccess
    | ClearPlanetState