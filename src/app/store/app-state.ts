import { User } from "../models/user";
import { Planet } from "../models/planet";
import { Explorer } from "../models/explorer";

export interface AppState {

    userState: {
        signedInUser: User;
    }

    planetState: {
        allPlanets: Planet[];
        currentPlanet: Planet;
    }

    explorerState: {
        currentExplorer: Explorer;
    }
}