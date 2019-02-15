import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { User } from 'src/app/models/user';
import * as selectors from '../../store/selectors';
import { Planet } from 'src/app/models/planet';
import { Quest } from 'src/app/models/quest';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';

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
  userSignedIn = false;
  moderatorSignedIn = false;
  allPlanets = [];

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

  viewQuestClicked() {
    this.store.dispatch(new actions.GetSelectedQuestSuccess(this.currentQuest));
    this.navigateQuest();
  }

  viewPlanetClicked() {

  }

  sliceHasLoginSucceeded() {
    combineLatest(
      this.store.select(selectors.moderatorSignedIn),
      this.store.select(selectors.userSignedIn)
    ).subscribe(combinedValue => {
      this.moderatorSignedIn = combinedValue[0];
      this.userSignedIn = combinedValue[1];
      if (!this.moderatorSignedIn && !this.userSignedIn) {
        this.navigateLogin();
      }
    });
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if (this.moderatorSignedIn) {
        this.signedInUser = signedInUser;
        this.store.dispatch(new actions.RequestGetPlanets());
      } else if (this.userSignedIn) {
        this.signedInUser = signedInUser;
        this.store.select(selectors.fetchedCurrentPlanet).subscribe(fetchedCurrentPlanet => {
          if (!fetchedCurrentPlanet) {
            this.store.dispatch(new actions.RequestGetDefaultPlanet(this.signedInUser.userId));
          }
        });
      }
    });
  }

  sliceAllPlanets() {
    this.store.select(selectors.allPlanets).subscribe(allPlanets => {
      if (this.moderatorSignedIn) {
        this.allPlanets = allPlanets;
      }
    });
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if (this.userSignedIn) {
        this.currentPlanet = currentPlanet;

        this.store.select(selectors.fetchedCurrentQuest).subscribe(fetchedCurrentQuest => {
          if (!fetchedCurrentQuest) {
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
      if (this.userSignedIn) {
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
      if (this.userSignedIn && this.currentQuestExists) {
        this.currentQuest = currentQuest;
        this.checkStatus();
      }
    });
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();

    this.sliceAllPlanets();

    this.sliceCurrentPlanet();
    this.sliceCurrentQuestExists();
    this.sliceCurrentQuest();
  }
}
