import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  user: User;
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
      this.user = user;
    });
  }

}
