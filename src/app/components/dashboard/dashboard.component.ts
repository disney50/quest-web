import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { User } from 'src/app/models/user';
import * as selectors from '../../store/selectors';
import { Planet } from 'src/app/models/planet';
import { Quest } from 'src/app/models/quest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  signedInUser: User = {} as User;
  currentPlanet: Planet = {} as Planet;
  currentQuest: Quest = {} as Quest;
  currentQuestExists = false;
  status: string;
  signedIn = false;

  constructor(private store: Store<AppState>,
    private router: Router) {

  }

  navigateQuest() {
    this.router.navigateByUrl('quest');
  }

  navigateQuests() {
    this.router.navigateByUrl('quests');
  }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  checkStatus() {
    if (this.currentQuest.status === 'inprogress') {
      this.status = 'IN PROGRESS';
    } else if (this.currentQuest.status === 'moderating') {
      this.status = 'MODERATING';
    }
  }

  viewClicked() {
    this.store.dispatch(new actions.GetSelectedQuestSuccess(this.currentQuest));
    this.navigateQuest();
  }

  sliceHasLoginSucceeded() {
    this.store.select(selectors.hasLoginSucceeded).subscribe(signedIn => {
      if (!signedIn) {
        this.navigateLogin();
      } else {
        this.signedIn = true;
      }
    });
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if (this.signedIn) {
        this.signedInUser = signedInUser;
        this.store.select(selectors.fetchedCurrentPlanet).subscribe(fetchedCurrentPlanet => {
          if (!fetchedCurrentPlanet) {
            this.store.dispatch(new actions.RequestGetDefaultPlanet(this.signedInUser.userId));
          }
        });
      }
    });
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if (this.signedIn) {
        this.currentPlanet = currentPlanet;

        this.store.select(selectors.fetchedCurrentQuest).subscribe(fetchedCurrentQuest => {
          if (!fetchedCurrentQuest) {
            console.log('hello');
            
            this.store.dispatch(new actions.RequestInProgressQuestExists(this.currentPlanet.name, this.signedInUser.userId));
          }
        });

        this.store.select(selectors.fetchedPlanetQuests).subscribe(fetchedPlanetQuests => {
          if (!fetchedPlanetQuests) {
            this.store.dispatch(new actions.RequestGetPlanetQuests(this.currentPlanet.name));
          }
        });

        this.store.select(selectors.fetchedExplorerQuests).subscribe(fetchedExplorerQuests => {
          if (!fetchedExplorerQuests) {
            this.store.dispatch(new actions.RequestGetExplorerQuests(this.currentPlanet.name, this.signedInUser.userId));
          }
        });
      }
    });
  }

  sliceCurrentQuestExists() {
    this.store.select(selectors.currentQuestExists).subscribe(currentQuestExists => {
      if (this.signedIn) {
        if (currentQuestExists) {
          this.currentQuestExists = true;
        } else if (!currentQuestExists) {
          this.currentQuestExists = false;
        }
      }
    });
  }

  sliceCurrentQuest() {
    this.store.select(selectors.currentQuest).subscribe(currentQuest => {
      if (this.signedIn && this.currentQuestExists) {
        this.currentQuest = currentQuest;
        this.checkStatus();
      }
    });
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.sliceCurrentQuestExists();
    this.sliceCurrentQuest();
  }
}
