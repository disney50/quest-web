import { User } from "../models/user";
import { Planet } from "../models/planet";

export interface AppState {

    planetState: {
        planets: Planet[];
    }
    
    userState: {
        user: User;
    }
}