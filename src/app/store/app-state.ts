import { User } from "../models/user";
import { Planet } from "../models/planet";
import { Explorer } from "../models/explorer";

export interface AppState {

    userState: {
        user: User;
    }

    planetState: {
        planets: Planet[];
    }

    explorerState: {
        explorers: Explorer[];
    }
}