import { User } from "../models/user";
import { Planet } from "../models/planet";

export interface AppState {

    userState: {
        user: User;
    }

    planetState: {
        planets: Planet[];
    }
}