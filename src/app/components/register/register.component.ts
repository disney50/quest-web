import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { ExplorerService } from 'src/app/services/explorer/explorer.service'; import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { LoginDetails } from 'src/app/models/login-details';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  maleStatus = true;
  femaleStatus = false;
  newUser: User = {} as User;
  allPlanets: Planet[];
  selectedPlanet: Planet = {} as Planet;
  message: string = null;

  constructor(private userService: UserService,
    private router: Router,
    private planetService: PlanetService,
    private explorerService: ExplorerService,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore) {

  }

  navigateDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  maleClicked() {
    this.maleStatus = true;
    this.femaleStatus = false;
  }

  femaleClicked() {
    this.maleStatus = false;
    this.femaleStatus = true;
  }

  registerClicked(selectedPlanet: Planet) {
    if (!this.newUser.email || !this.newUser.name || !this.newUser.password || !this.newUser.surname) {
      this.message = 'You forgot to fill in some fields';
    } else {
      this.selectedPlanet = selectedPlanet;
      this.checkUserExistsUsers();
    }
  }

  checkUserExistsUsers() {
    this.userService.checksUserExistsUsers(this.newUser.email).subscribe(user => {
      if (user) {
        this.message = 'There is already user with this email';
      } else {
        this.checkUserExistsExplorers();
      }
    });
  }

  checkUserExistsExplorers() {
    this.userService.checksUserExistsExplorers(this.newUser.email).subscribe(user => {
      if (user) {
        this.message = 'There is already user with this email';
      } else {
        this.getNewUserGender();
      }
    });
  }

  getNewUserGender() {
    if (this.maleStatus === true) {
      this.newUser.gender = 'MALE';
    } else {
      this.newUser.gender = 'FEMALE';
    }
    this.registerNewUser();
  }

  registerNewUser() {
    this.userService.registerNewUser(this.newUser);
    this.addSelectedPlanetToUser();
  }

  addSelectedPlanetToUser() {
    this.planetService.createPlanet(this.newUser.userId, this.selectedPlanet);
    this.createNewExplorer();
  }

  createNewExplorer() {
    this.explorerService.createExplorer(this.selectedPlanet.name, this.newUser);
    this.signInUser();
  }

  signInUser() {
    this.store.dispatch(new actions.RequestUserExistsUsers({ email: this.newUser.email, password: this.newUser.password } as LoginDetails));
  }

  sliceAllPlanets() {
    this.store.select(selectors.allPlanets).subscribe(allPlanets => {
      if (allPlanets) {
        this.allPlanets = allPlanets;
      }
    });
  }

  sliceHasLoginSucceeded() {
    this.store.select(selectors.hasLoginSucceeded).subscribe(signedIn => {
      if (signedIn) {
        this.navigateDashboard();
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new actions.RequestGetPlanets);
    this.sliceAllPlanets();
    this.sliceHasLoginSucceeded();
  }
}
