import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { ExplorerService } from 'src/app/services/explorer/explorer.service';

@Component({
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.css']
})
export class ModerationComponent implements OnInit {
  moderatorSignedIn = false;
  userSignedIn = false;
  signedInUser = {} as User;
  currentPlanet = {} as Planet;
  planetExplorers = [];
  explorersRequiringModeration = [];

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

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
    this.navigateLogin();
  }

  sliceAppState() {
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

    if (this.moderatorSignedIn) {
      this.store.select(selectors.signedInUser).subscribe(signedInUser => {
        this.signedInUser = signedInUser;
      });

      this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
        this.currentPlanet = currentPlanet;
        this.store.dispatch(new actions.RequestGetExplorers(this.currentPlanet.name));
      });

      this.store.select(selectors.planetExplorers).subscribe(planetExplorers => {
        this.planetExplorers = planetExplorers;
        this.explorerService.createExplorersRequiringModeratorActionArray(this.planetExplorers, this.currentPlanet.name);
      });

      this.store.select(selectors.explorersRequiringModeration).subscribe(explorersRequiringModeration => {
        this.explorersRequiringModeration = explorersRequiringModeration;
      });
    }
  }

  ngOnInit() {
    this.sliceAppState();
  }

}
