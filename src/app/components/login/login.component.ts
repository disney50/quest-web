import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public authenticationState = null;

  constructor(private authService: AuthService, private router: Router, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.authenticationState = user;
      } 
      else {
        this.authenticationState = null;
      }

      if (this.authenticationState != null) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  signIn() {
    this.authService.googleSignIn().then(() => {
      this.router.navigateByUrl('/dashboard');
    })
  }

}
