import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { ExplorerService } from 'src/app/services/explorer/explorer.service';

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
    private explorerService: ExplorerService) {}

  ngOnInit() {}

  navigateRegister() {
    console.log("navigateRegister()");
    
    this.router.navigateByUrl("register");
  }

  signInClicked(email: string, password: string) {
    console.log("signInClicked()");
    
    if (!email) {
      this.message = "No email entered"
    }
    else if (!password) {
      this.message = "No password entered"
    }
    else {
      this.authenticationService.getEnteredEmailAndPassword(email, password);

      this.authenticationService.authenticateUser(email, password).subscribe(res => {
        if (res.length > 0) {      
          this.globalService.userExists = true;
        }
        else {
          this.globalService.userExists = false;
        }
        this.userAuthenticated();
      });
    }
  }

  userAuthenticated() {
    console.log("userAuthenticated()");
                
    if (this.globalService.userExists == true) {
      this.authenticationService.signInExistingUser();
      this.getUserPlanet();
    }
    else {
      this.message = "Incorrect email or password entered"
    }
  }

  getUserPlanet() {
    console.log("getUserPlanet() in login.component");
    
    this.planetService.getUserPlanet();

    // this.getCurrentExplorer();
  }

  getCurrentExplorer() {
    console.log("getCurrentExplorer()");
    
    this.explorerService.getCurrentExplorer();
    this.navigateDashboard();
  }

  navigateDashboard() {
    console.log("navigateDashboard()");
    
    this.router.navigateByUrl("dashboard");
  }

}
