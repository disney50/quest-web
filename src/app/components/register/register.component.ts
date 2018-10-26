import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { Planet } from 'src/app/models/planet';

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

  constructor(private userService: UserService, private store: Store<AppState>) {
    this.store.dispatch(new actions.RequestGetPlanets);

    this.store.select("planet").subscribe(planetState => {
      this.planets = planetState.planets;            
    })
   }

  ngOnInit() {
  }

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

  registerNewUser(): void {
    this.checkNewUserGender();
    this.userService.registerNewUser(this.newUser);
    this.newUser = {} as User;
    this.maleClickEvent();
  }

}