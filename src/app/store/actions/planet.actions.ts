import { Action } from "@ngrx/store";
import { Planet } from "src/app/models/planet";

export const REQUEST_GET_PLANET = "[planet] REQUEST_GET_PLANET";
export const GET_PLANET_SUCCESS = "[planet] GET_PLANET_SUCCESS";

export class RequestGetPlanet implements Action {
    type = REQUEST_GET_PLANET;
    constructor() {}
}

export class GetPlanetSuccess implements Action {
    type = GET_PLANET_SUCCESS;
    constructor(public payload: Planet) {}
}

export type PlanetActions =
    | RequestGetPlanet
    | GetPlanetSuccess