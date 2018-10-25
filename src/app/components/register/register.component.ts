import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maleStatus: boolean = true;
  femaleStatus: boolean = false;
  newUser: User = {} as User;

  constructor() { }

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

  registerNewUser(newUser: User) {
    console.log(newUser);
    if(this.maleStatus == true) {
      newUser.gender = "MALE";
    }
    else {
      newUser.gender = "FEMALE";
    }
    console.log(newUser);
  }

}
