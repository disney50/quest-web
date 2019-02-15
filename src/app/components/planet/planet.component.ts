import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

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

  constructor(private store: Store<AppState>,
    private router: Router
  ) { }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }

  navigatDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
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

  slicePlanetExplorers() {
    this.store.select(selectors.planetExplorers).subscribe(planetExplorers => {
      if (this.moderatorSignedIn) {
        this.planetExplorers = planetExplorers;
      }
    });
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if (this.moderatorSignedIn) {
        this.currentPlanet = currentPlanet;

        this.store.select(selectors.fetchedPlanetQuests).subscribe(fetchedPlanetQuests => {
          if (!fetchedPlanetQuests) {
            this.store.dispatch(new actions.RequestGetPlanetQuests(this.currentPlanet.name));
          }
        });
      }
    });
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.slicePlanetExplorers();
    this.sliceCurrentPlanet();
  }

}
