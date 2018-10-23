import { User } from "../models/user";

export interface AppState {

    userState: {
        user: User;
    }
}