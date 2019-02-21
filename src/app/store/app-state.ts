import { User } from '../models/user';
import { Planet } from '../models/planet';
import { Explorer } from '../models/explorer';
import { Quest } from '../models/quest';
import { Comment } from '../models/comment';
import { ExplorerRequiringModeratorAction } from '../models/explorers-requiring-moderator-action';
import { QuestWithNewComments } from '../models/quest-with-new-comments';

export interface AppState {

    userState: {
        signedInUser: User;
        userSignedIn: boolean;
        moderatorSignedIn: boolean;
        loginFailed: boolean;
    };

    planetState: {
        allPlanets: Planet[];
        currentPlanet: Planet;
        fetchedCurrentPlanet: boolean;
    };

    explorerState: {
        planetExplorers: Explorer[];
        currentExplorer: Explorer;
        selectedExplorer: Explorer;
        explorersRequiringModeratorAction: ExplorerRequiringModeratorAction[];
    };

    questState: {
        planetQuests: Quest[];
        fetchedPlanetQuests: boolean;
        explorerQuests: Quest[];
        fetchedExplorerQuests: boolean;
        currentQuest: Quest;
        fetchedCurrentQuest: boolean;
        currentQuestExists: boolean;
        selectedQuest: Quest;
        questsWithNewComments: QuestWithNewComments[];
    };

    commentState: {
        allComments: Comment[];
    };
}
