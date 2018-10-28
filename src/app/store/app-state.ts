import { User } from "../models/user";
import { Planet } from "../models/planet";
import { Explorer } from "../models/explorer";

export interface AppState {

    userState: {
        signedInUser: User;
    }

    planetState: {
        planets: Planet[];
        currentPlanet: Planet;
    }

    explorerState: {
        explorers: Explorer[];
    }
}