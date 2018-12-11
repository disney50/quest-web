import { User } from '../models/user';
import { Planet } from '../models/planet';
import { Explorer } from '../models/explorer';
import { Quest } from '../models/quest';
import { Comment } from '../models/comment';

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
        planetQuests: Quest[];
        currentQuest: Quest;
        currentQuestExists: boolean;
    };

    commentState: {
        allComments: Comment[];
    };
}
