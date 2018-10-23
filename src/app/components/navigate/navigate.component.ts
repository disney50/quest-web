import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  questUser: User;
  firebaseUserId: string;

  constructor(private angularFireAuth: AngularFireAuth, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.startUserListener();
    this.getUser();
  }

  startUserListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.firebaseUserId = user.uid;
        this.userService.getUserByFirebaseUserId(this.firebaseUserId);
      } 
      else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  getUser() {
    this.userService.user$.subscribe(user => {
      // this.questUser = user;
    });
  }

}
