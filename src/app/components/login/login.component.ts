import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = null;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService) {}

  ngOnInit() {}

  navigateRegister() {
    this.router.navigateByUrl("register");
  }

  signInClicked(email: string, password: string) {
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
    if (this.globalService.userExists == true) {
      this.authenticationService.signInExistingUser();
    }
    else {
      this.message = "Incorrect email or password entered"
    }
  }

}
