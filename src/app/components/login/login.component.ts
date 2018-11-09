import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { ExplorerService } from 'src/app/services/explorer/explorer.service';
import { User } from 'firebase';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions/user.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = null;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService,
    private planetService: PlanetService,
    private explorerService: ExplorerService,
    private store: Store<AppState>) { }

  ngOnInit() { }

  navigateRegister() {
    this.router.navigateByUrl("register");
  }

  signInClicked(email: string, password: string) {
    console.log("1.signInClicked()");

    if (!email) {
      this.message = "No email entered"
    }
    else if (!password) {
      this.message = "No password entered"
    }
    else {
     // this.authenticationService.getEnteredEmailAndPassword(email, password);

   //   this.authenticationService.authenticateUser(email, password);
      
    //  this.userAuthenticated();
    this.store.dispatch(new actions.RequestLoginUser({username: email, password: password}));
    }
  }

  userAuthenticated() {
    console.log("4.userAuthenticated()");

    if (this.globalService.userExists == true) {
      this.authenticationService.signInExistingUser().subscribe(userState => {
        if (userState.signedInUser.name){
          this.getUserPlanet();
        }
      });
    }
    else {
      this.message = "Incorrect email or password entered"
    }
  }

  getUserPlanet() {
    console.log("6.getUserPlanet()");

    this.planetService.getUserPlanet();

    this.getCurrentExplorer();
  }

  getCurrentExplorer() {
    console.log("8.getCurrentExplorer()");

    this.explorerService.getCurrentExplorer();

    // this.navigateDashboard();
  }

  navigateDashboard() {
    console.log("10.navigateDashboard()");

    this.router.navigateByUrl("dashboard");
  }

}
