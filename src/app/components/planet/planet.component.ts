import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Quest } from 'src/app/models/quest';
import { Explorer } from 'src/app/models/explorer';
import { ExplorerService } from 'src/app/services/explorer/explorer.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {
  signedInUser: User = {} as User;
  currentPlanet: Planet = {} as Planet;
  userSignedIn = false;
  moderatorSignedIn = true;
  planetExplorers = [];
  planetQuests = [];
  planetExplorersIds = [];

  explorersRequiringModeratorAction = [];

  constructor(private store: Store<AppState>,
    private router: Router,
    private explorerService: ExplorerService
  ) { }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }

  navigatDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  navigateQuest() {
    this.router.navigateByUrl('quest');
  }

  navigateCreate() {
    this.router.navigateByUrl('create');
  }

  navigateExplorer() {
    this.router.navigateByUrl('explorer');
  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
    this.navigateLogin();
  }

  questClicked(selectedQuest: Quest) {
    this.store.dispatch(new actions.GetSelectedQuestSuccess(selectedQuest));
    this.navigateQuest();
  }

  explorerClicked(selectedExplorer: Explorer) {
    this.planetExplorers.forEach(planetExplorer => {
      if (this.planetExplorersIds.indexOf(planetExplorer) === -1) {
        this.planetExplorersIds.push(planetExplorer.userId);
      }
    });
    let selectedPlanetExplorer = this.planetExplorers[(this.planetExplorersIds.indexOf(selectedExplorer.userId))];
    this.store.dispatch(new actions.GetSelectedExplorerSuccess(selectedPlanetExplorer));
    this.navigateExplorer();
  }

  createClicked() {
    this.navigateCreate();
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

  slicePlanetExplorers() {
    this.store.select(selectors.planetExplorers).subscribe(planetExplorers => {
      if (this.moderatorSignedIn) {
        this.planetExplorers = planetExplorers;
        this.explorerService.createExplorersRequiringModeratorActionArray(this.planetExplorers, this.currentPlanet.name);
      }
    });
  }

  sliceExplorersRequiringModeratorAction() {
    this.store.select(selectors.explorersRequiringModeratorAction).subscribe(explorersRequiringModeratorAction => {
      if (this.moderatorSignedIn) {
        this.explorersRequiringModeratorAction = explorersRequiringModeratorAction;
      }
    });
  }

  slicePlanetQuests() {
    this.store.select(selectors.planetQuests).subscribe(planetQuests => {
      if (this.moderatorSignedIn) {
        this.planetQuests = planetQuests;
      }
    });
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.slicePlanetExplorers();
    this.sliceExplorersRequiringModeratorAction();
    this.slicePlanetQuests();
  }

}
