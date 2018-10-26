import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { ExplorerService } from 'src/app/services/explorer/explorer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maleStatus: boolean = true;
  femaleStatus: boolean = false;
  newUser: User = {} as User;

  constructor(private userService: UserService, private explorerService: ExplorerService) { }

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
    // this.explorerService.createNewExplorer(this.newUser);
    this.newUser = {} as User;
    this.maleClickEvent();
  }

}
