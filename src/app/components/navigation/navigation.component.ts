import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Planet } from '../../models/planet';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  userSignedIn = false;
  moderatorSignedIn = false;
  signedInUser = {} as User;
  currentPlanet = {} as Planet;
  fetchedCurrentPlanet = false;

  moderatorComponents = ['dashboard', 'moderation', 'comments'];
  userComponents = ['dashboard', 'quests'];
  signedOutComponents = ['login', 'register'];

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }

  logOutClicked() {
    this.moderatorSignedIn = false;
    this.userSignedIn = false;
    this.signedInUser = {} as User;
    this.store.dispatch(new actions.LogOutUser);
    this.navigateLogin();
  }

  navigateComponent(component: string) {
    this.router.navigateByUrl(component);
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
      }
    });

    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if (this.moderatorSignedIn) {
        this.signedInUser = signedInUser;
        this.store.dispatch(new actions.RequestGetPlanets());
      } else if (this.userSignedIn) {
        this.signedInUser = signedInUser;
      }
    });

    this.store.select(selectors.fetchedCurrentPlanet).subscribe(fetchedCurrentPlanet => {
      this.fetchedCurrentPlanet = fetchedCurrentPlanet;

      if (this.moderatorSignedIn && !fetchedCurrentPlanet) {
        this.store.dispatch(new actions.RequestGetDefaultPlanet(this.signedInUser.userId));
      } else if (this.userSignedIn && !fetchedCurrentPlanet) {
        this.store.dispatch(new actions.RequestGetDefaultPlanet(this.signedInUser.userId));
      }
    });

    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if (this.userSignedIn) {
        this.currentPlanet = currentPlanet;
      }
    });
  }

  ngOnInit() {
    this.sliceAppState();
  }

}
