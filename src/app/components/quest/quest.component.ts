import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { Quest } from 'src/app/models/quest';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {
  signedInUser: User = {} as User;
  currentPlanet: Planet = {} as Planet;
  currentQuest: Quest = {} as Quest;
  allComments: Comment[];
  newComment: Comment = {} as Comment;

  constructor(private store: Store<AppState>, 
    private router: Router, 
    private commentService: CommentService) { 

    }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  navigateLogin() {
    this.router.navigateByUrl("login");
  }

  sendClicked(newComment: string) {
    this.createComment(newComment);
  }

  createComment(newComment: string) {
    this.newComment = this.commentService.createComment(newComment);
    this.sendComment();
  }

  sendComment() {
    this.commentService.sendComment(this.currentPlanet.name, this.signedInUser.userId, this.currentQuest.questId, this.newComment);
  }

  sliceHasLoginSucceeded() {
    this.store.select(selectors.hasLoginSucceeded).subscribe(signedIn => {
      if(!signedIn) {
        this.navigateLogin();
      }
    });
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if(signedInUser) {
        this.signedInUser = signedInUser;
        this.store.dispatch(new actions.RequestGetDefaultPlanet(this.signedInUser.userId));
      }
    })
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if(currentPlanet) {               
        this.currentPlanet = currentPlanet;
        this.store.dispatch(new actions.RequestInProgressQuestExists(this.currentPlanet.name, this.signedInUser.userId));
      }
    })
  }

  sliceCurrentQuest() {
    this.store.select(selectors.currentQuest).subscribe(currentQuest => {
      if(currentQuest) {
        this.currentQuest = currentQuest;
        this.store.dispatch(new actions.RequestGetAllComments(this.currentPlanet.name, this.signedInUser.userId, this.currentQuest.questId));
      }
    })
  }

  sliceAllComments() {
    this.store.select(selectors.allComments).subscribe(allComments => {
      if(allComments) {
        this.allComments = allComments;        
      }
    })
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.sliceCurrentQuest();
    this.sliceAllComments();
  }

}
