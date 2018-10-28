import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { Planet } from 'src/app/models/planet';
import { GlobalService } from 'src/app/services/global/global.service';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { ExplorerService } from 'src/app/services/explorer/explorer.service';
import { Explorer } from 'src/app/models/explorer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maleStatus: boolean = true;
  femaleStatus: boolean = false;
  newUser: User = {} as User;
  planets: Planet[];
  newExplorer: Explorer = {} as Explorer;
  newUserPlanet: Planet = {} as Planet;

  constructor(private userService: UserService, 
    private globalService: GlobalService,
    private planetService: PlanetService,
    private store: Store<AppState>,
    private explorerService: ExplorerService,
    private router: Router) {

    this.store.dispatch(new actions.RequestGetPlanets);

    this.store.select("planet").subscribe(planetState => {
      this.planets = planetState.planets;            
    })
  }

  ngOnInit() {}

  maleClickEvent() {
    this.maleStatus = true;
    this.femaleStatus = false;  
  }

  femaleClickEvent() {
    this.maleStatus = false;
    this.femaleStatus = true;
  }

  checkNewUserGender() {
    if(this.maleStatus == true) {
      this.newUser.gender = "MALE";
    }
    else {
      this.newUser.gender = "FEMALE";
    }
    return this.newUser;
  }

  createNewUser() {
    this.checkNewUserGender();
    this.newUser = this.userService.createNewUserId(this.newUser);
    this.registerNewUser();
  }

  registerNewUser() {
    this.userService.registerNewUser(this.newUser);
    this.signInNewUser();
  }

  signInNewUser() {
    this.globalService.setSignedInUser(this.newUser);
    this.store.dispatch(new actions.RequestGetSignedInUser);

    this.store.select("user").subscribe(userState => {
      userState.signedInUser = this.globalService.signedInUser;            
    })
  }

  addNewUserPlanet(planet: Planet) {
    this.newUserPlanet = planet;
    this.planetService.addNewUserPlanet(this.globalService.signedInUser, this.newUserPlanet);
    this.setCurrentPlanet(this.newUserPlanet);
  }

  setCurrentPlanet(planet: Planet) {
    this.globalService.setCurrentPlanet(planet);
    this.store.dispatch(new actions.RequestGetCurrentPlanet);

    this.store.select("planet").subscribe(planetState => {
      planetState.currentPlanet = this.globalService.currentPlanet;            
    })
    this.createNewExplorer();
  }

  createNewExplorer() {
    this.newExplorer = this.explorerService.createNewExplorer(this.globalService.signedInUser);
    this.setCurrentExplorer();
  }

  setCurrentExplorer() {
    this.globalService.setCurrentExplorer(this.newExplorer);
    this.router.navigateByUrl("/dashboard");
  }
}