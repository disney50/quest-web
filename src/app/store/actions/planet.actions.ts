import { Action } from "@ngrx/store";
import { Planet } from "src/app/models/planet";
import { User } from "src/app/models/user";

export const REQUEST_GET_ALL_PLANETS = "[planet] REQUEST_GET_ALL_PLANETS";
export const GET_ALL_PLANETS_SUCCESS = "[planet] GET_ALL_PLANETS_SUCCESS";
export const REQUEST_GET_SELECTED_PLANET = "[planet] REQUEST_GET_SELECTED_PLANET";
export const REQUEST_GET_DEFAULT_PLANET = "[planet] REQUEST_GET_DEFAULT_PLANET";
export const GET_PLANET_SUCCESS = "[planet] GET_PLANET_SUCCESS";

export class RequestGetAllPlanets implements Action {
    type = REQUEST_GET_ALL_PLANETS;
    constructor() {}
}

export class GetAllPlanetsSuccess implements Action {
    type = GET_ALL_PLANETS_SUCCESS;
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

export type PlanetActions =
    | RequestGetAllPlanets
    | GetAllPlanetsSuccess
    | RequestGetSelectedPlanet
    | RequestGetDefaultPlanet
    | GetPlanetSuccess