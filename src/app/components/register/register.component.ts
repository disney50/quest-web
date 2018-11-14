import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { ExplorerService } from 'src/app/services/explorer/explorer.service';import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register/register.service';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { GlobalService } from 'src/app/services/global/global.service';

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

  constructor(private registerService: RegisterService,
    private router: Router,
    private planetService: PlanetService,
    private explorerService: ExplorerService,
    private globalService: GlobalService,
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
    this.newUser.userId = this.registerService.createNewUserId();
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
    this.registerService.registerNewUser(this.newUser);
    this.signInUser();
  }

  signInUser() {
    this.store.dispatch(new actions.RequestGetUserById(this.newUser.userId));
    this.globalService.setSignedInUser(this.newUser);    
    this.addNewUserPlanet();
  }

  addNewUserPlanet() {
    this.planetService.addSelectedPlanet(this.selectedPlanet);
    this.globalService.setCurrentPlanet(this.selectedPlanet);    
    this.createNewExplorer();
  }

  createNewExplorer() {    
    this.explorerService.createNewExplorer();
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