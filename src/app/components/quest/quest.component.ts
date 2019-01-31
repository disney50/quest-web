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
import { UploadService } from 'src/app/services/upload/upload.service';
import { QuestService } from 'src/app/services/quest/quest.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {
  signedInUser: User = {} as User;
  currentPlanet: Planet = {} as Planet;
  currentQuest: Quest = {} as Quest;
  selectedQuest: Quest = {} as Quest;
  allComments: Comment[];
  newComment: Comment = {} as Comment;
  message: string = null;
  signedIn = false;
  selectedFile: File;
  isUndefined: boolean;
  isInProgress: boolean;
  isModerating: boolean;
  isCompleted: boolean;

  constructor(private store: Store<AppState>,
    private router: Router,
    private commentService: CommentService,
    private uploadService: UploadService,
    private questService: QuestService) {

  }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }

  navigateDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  checkStatus() {
    if (this.selectedQuest.status === 'inprogress'
      || this.selectedQuest.status === 'moderating'
      || this.selectedQuest.status === 'completed') {
      this.store.dispatch(new actions.RequestGetComments(this.currentPlanet.name, this.signedInUser.userId, this.selectedQuest.questId));
      this.sliceAllComments();
      if (this.selectedQuest.status === 'inprogress') {
        this.isInProgress = true;
      } else if (this.selectedQuest.status === 'moderating') {
        this.isModerating = true;
      } else if (this.selectedQuest.status === 'completed') {
        this.isCompleted = true;
      }
    } else {
      this.isUndefined = true;
    }
  }

  sendClicked(newComment: string) {
    if (!newComment) {
      this.message = 'You forgot to write a comment';
    } else {
      this.commentService.createComment(this.currentPlanet.name, this.signedInUser.userId, this.selectedQuest.questId, newComment);
    }
  }

  fileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  submitClicked() {
    if (!this.selectedFile) {
      this.message = 'You forgot to upload a file';
    } else {
      this.uploadService
        .uploadFileToStorage(this.selectedFile, this.currentPlanet.name, this.signedInUser.userId, this.selectedQuest.questId);
      this.questService.submitQuest(this.currentPlanet.name, this.signedInUser.userId, this.selectedQuest);
      this.navigateDashboard();
    }
  }

  launchClicked() {
    this.questService.launchQuest(this.currentPlanet.name, this.signedInUser.userId, this.selectedQuest);
    this.navigateDashboard();
  }

  sliceHasLoginSucceeded() {
    this.store.select(selectors.hasLoginSucceeded).subscribe(signedIn => {
      if (!signedIn) {
        this.navigateLogin();
      } else {
        this.signedIn = true;
      }
    });
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if (this.signedIn) {
        this.signedInUser = signedInUser;
      }
    });
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if (this.signedIn) {
        this.currentPlanet = currentPlanet;
      }
    });
  }

  sliceSelectedQuest() {
    this.store.select(selectors.selectedQuest).subscribe(selectedQuest => {
      if (this.signedIn) {
        this.selectedQuest = selectedQuest;
        this.checkStatus();
      }
    });
  }

  sliceAllComments() {
    this.store.select(selectors.allComments).subscribe(allComments => {
      if (this.signedIn) {
        this.allComments = allComments;
      }
    });
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.sliceSelectedQuest();
  }

}
