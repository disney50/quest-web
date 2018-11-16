import { User } from '../models/user';
import { Planet } from '../models/planet';
import { Explorer } from '../models/explorer';
import { Quest } from '../models/quest';

export interface AppState {

    userState: {
        signedInUser: User;
        signedIn: boolean;
        loginFailed: boolean;
    };
    planetState: {
        allPlanets: Planet[];
        currentPlanet: Planet;
    };

    explorerState: {
        currentExplorer: Explorer;
    };

    questState: {
        currentQuest: Quest;
    }
}
