import { Component, OnInit } from '@angular/core';
import { Quest } from 'src/app/models/quest';
import { Level1 } from 'src/app/models/level1';
import { Level2 } from 'src/app/models/level2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { User } from 'src/app/models/user';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Planet } from 'src/app/models/planet';
import { QuestService } from 'src/app/services/quest/quest.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  signedInUser: User = {} as User;
  moderatorSignedIn = false;
  userSignedIn = false;
  currentPlanet: Planet = {} as Planet;
  planetQuests = [];
  newQuest: Quest = {} as Quest;
  newLevel1: Level1 = {} as Level1;
  newLevel2: Level2 = {} as Level2;
  newPrerequisite = '';
  newPrerequisites = [];
  message: string = null;

  constructor(private store: Store<AppState>,
    private router: Router,
    private questService: QuestService
  ) { }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }

  navigatDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  navigatePlanet() {
    this.router.navigateByUrl('planet');
  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
    this.navigateLogin();
  }

  createClicked() {
    if (!this.newQuest.title ||
      !this.newQuest.description ||
      !this.newQuest.max_xp ||
      !this.newQuest.order ||
      !this.newLevel1.name ||
      !this.newLevel2.name ||
      !this.newPrerequisite) {
      this.message = 'You forgot to fill in some fields';
    } else {
      this.createNewQuest();
      this.navigatePlanet();
    }

  }

  createNewQuest() {
    this.newPrerequisites.push(this.newPrerequisite);
    this.newQuest.prerequisites = this.newPrerequisites;
    this.newQuest.level1 = this.newLevel1;
    this.newQuest.level2 = this.newLevel2;
    this.questService.createNewQuest(this.currentPlanet.name, this.newQuest);
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
      } else if (this.userSignedIn) {
        this.navigatDashboard();
      }
    });
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if (this.moderatorSignedIn) {
        this.signedInUser = signedInUser;
      }
    });
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if (this.moderatorSignedIn) {
        this.currentPlanet = currentPlanet;

        this.store.dispatch(new actions.RequestGetExplorers(this.currentPlanet.name));

        this.store.select(selectors.fetchedPlanetQuests).subscribe(fetchedPlanetQuests => {
          if (this.moderatorSignedIn && !fetchedPlanetQuests) {
            this.store.dispatch(new actions.RequestGetPlanetQuests(this.currentPlanet.name));
          }
        });
      }
    });
  }

  slicePlanetQuests() {
    this.store.select(selectors.planetQuests).subscribe(planetQuests => {
      if (this.moderatorSignedIn) {
        this.planetQuests = planetQuests;
      }
    })
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.slicePlanetQuests();
  }

}
