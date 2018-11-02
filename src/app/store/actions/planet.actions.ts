import { Action } from "@ngrx/store";
import { Planet } from "src/app/models/planet";

export const REQUEST_GET_PLANETS = "[planet] REQUEST_GET_PLANETS";
export const REQUEST_GET_CURRENT_PLANET = "[planet] REQUEST_GET_CURRENT_PLANET";
export const REQUEST_GET_USER_PLANET = "[planet] REQUEST_GET_USER_PLANET";
export const GET_PLANET_SUCCESS = "[planet] GET_PLANET_SUCCESS";
export const REMOVE_ALL_PlANETS = "[planet] REMOVE_ALL_PlANETS";

export class RequestGetPlanets implements Action {
    type = REQUEST_GET_PLANETS;
    constructor() {}
}

export class RequestGetCurrentPlanet implements Action {
    type = REQUEST_GET_CURRENT_PLANET;
    constructor() {}
}

export class RequestGetUserPlanet implements Action {
    type = REQUEST_GET_USER_PLANET;
    constructor() {}
}

export class GetPlanetSuccess implements Action {
    type = GET_PLANET_SUCCESS;
    constructor(public payload: Planet) {}
}

export class RemoveAllPlanets implements Action {
    type = REMOVE_ALL_PlANETS;
    constructor() {}
}

export type PlanetActions =
    | RequestGetPlanets
    | RequestGetCurrentPlanet
    | RequestGetUserPlanet
    | GetPlanetSuccess
    | RemoveAllPlanets