import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {} as User;

  constructor(private router: Router) { }

  ngOnInit() { 
  }

  navigateRegister() {
    this.router.navigateByUrl("register");
  }

  signIn() {
    
  }

}
