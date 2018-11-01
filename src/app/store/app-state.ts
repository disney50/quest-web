import { User } from "../models/user";
import { Planet } from "../models/planet";
import { Explorer } from "../models/explorer";

export interface AppState {

    userState: {
        users: User[];
        signedInUser: User;
    }

    planetState: {
        planets: Planet[];
        currentPlanet: Planet;
    }

    explorerState: {
        currentExplorer: Explorer;
    }
}