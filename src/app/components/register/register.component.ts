import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { ExplorerService } from 'src/app/services/explorer/explorer.service';import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maleStatus: boolean = true;
  femaleStatus: boolean = false;
  newUser: User = {} as User;
  allPlanets: Planet[];
  selectedPlanet: Planet = {} as Planet;
  message: string = null;

  constructor(private userService: UserService,
    private router: Router,
    private planetService: PlanetService,
    private explorerService: ExplorerService,
    private store: Store<AppState>) {
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
      this.message  = "You forgot to fill in some fields"
    }
    else {
      this.selectedPlanet = selectedPlanet;
      this.getNewUserId();
    }
  }

  getNewUserId() {
    this.newUser.userId = this.userService.createNewUserId();
    this.getNewUserGender();
  }

  getNewUserGender() {
    if(this.maleStatus == true) {
      this.newUser.gender = "MALE";
    }
    else {
      this.newUser.gender = "FEMALE";
    }

    this.registerNewUser();
  }

  registerNewUser() {
    this.userService.registerNewUser(this.newUser);
    this.signInUser();
  }

  signInUser() {
    this.store.dispatch(new actions.RequestGetUserById(this.newUser.userId));
    this.addNewUserPlanet();
  }

  addNewUserPlanet() {
    this.planetService.addPlanetToUser(this.selectedPlanet);
    this.createNewExplorer();
  }

  createNewExplorer() {    
    this.explorerService.createExplorer();
    this.navigateDashboard();
  }

  navigateDashboard() {
    this.router.navigateByUrl("dashboard");
  }

  sliceAllPlanets() {
    this.store.select(selectors.allPlanets).subscribe(allPlanets => {
      if(allPlanets) {
        this.allPlanets = allPlanets;
      }
    })
  }

  ngOnInit() {
    this.store.dispatch(new actions.RequestGetAllPlanets);
    this.sliceAllPlanets();
  }
}