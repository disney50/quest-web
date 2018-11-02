import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions';
import { GlobalService } from 'src/app/services/global/global.service';
import { Planet } from 'src/app/models/planet';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  existingUser: User = {} as User;
  existingUserPlanet: Planet = {} as Planet;
  message: string = null;
  userCollection: AngularFirestoreCollection;
  users: User[];

  constructor(private router: Router, 
    private store: Store<AppState>, 
    private globalService: GlobalService) {}

  ngOnInit() {}

  navigateRegister() {
    this.router.navigateByUrl("register");
  }

  navigateDashboard() {
    this.router.navigateByUrl("dashboard");
  }

  checkEmailAndPassWordFields() {
    if (this.existingUser.email == null) {
      this.message = "No email entered"
    }
    else if (this.existingUser.password == null) {
      this.message = "No password entered"
    }
    else {
      this.globalService.setEmailAndPassword(this.existingUser);
      this.signInExistingUser();
    }
  }

  signInExistingUser() {
      this.store.dispatch(new actions.RequestUserSignIn);

      this.store.select("user").subscribe(userState =>{
        this.users = userState.users;
        if(this.users.length != 0) {
          this.existingUser.email = this.users[0].email;
          this.existingUser.gender = this.users[0].gender;
          this.existingUser.name = this.users[0].name;
          this.existingUser.password = this.users[0].password;
          this.existingUser.surname = this.users[0].surname;
          this.existingUser.userId = this.users[0].userId;
          this.globalService.setSignedInUser(this.existingUser);
          this.getExistingUserPlanet();
        }
        else {
          this.message = "Incorrect email or password entered"
        }
      });    
  }

  getExistingUserPlanet() {
    this.store.dispatch(new actions.RequestGetUserPlanet);

    this.store.select("planet").subscribe(planetState => {
      this.existingUserPlanet = planetState.currentPlanet;
      this.globalService.setCurrentPlanet(this.existingUserPlanet);
    });

    this.navigateDashboard(); 
  }

}
