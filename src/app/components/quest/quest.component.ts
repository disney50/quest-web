import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Planet } from 'src/app/models/planet';
import { Quest } from 'src/app/models/quest';
import * as actions from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment/comment.service';
import { FileService } from 'src/app/services/upload/file.service';
import { QuestService } from 'src/app/services/quest/quest.service';
import * as selectors from '../../store/selectors';
import { combineLatest } from 'rxjs';
import { Explorer } from 'src/app/models/explorer';
import { Upload } from 'src/app/models/upload';
import { DomSanitizer } from '@angular/platform-browser';

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
  selectedFile: File;
  isUndefined: boolean;
  isInProgress: boolean;
  isModerating: boolean;
  isCompleted: boolean;
  currentQuestExists: boolean;
  moderatorSignedIn = false;
  userSignedIn = false;
  selectedExplorer = {} as Explorer;
  documents = [];
  uploads = [];

  constructor(private store: Store<AppState>,
    private router: Router,
    private commentService: CommentService,
    private fileService: FileService,
    private questService: QuestService,
    private sanitizer: DomSanitizer
  ) { }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }

  navigateDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  getDocuments() {
    this.fileService.getCollectionForUpload(this.currentPlanet.name, this.selectedExplorer.userId, this.selectedQuest.questId)
      .valueChanges().subscribe(documents => {
        this.documents = documents;
        this.getUploads();
      });
  }

  getUploads() {
    this.documents.forEach(document => {
      this.fileService.downloadFileFromStorage(this.currentPlanet.name, this.selectedExplorer.userId,
        this.selectedQuest.questId, document.name)
        .then(url => {
          const upload = {} as Upload;
          const xmlHttpRequest = new XMLHttpRequest();
          xmlHttpRequest.responseType = 'blob';
          xmlHttpRequest.onload = () => {
            upload.name = document.name;
            const blob = xmlHttpRequest.response;
            upload.link = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            this.uploads.push(upload);
          };
          xmlHttpRequest.open('GET', url);
          xmlHttpRequest.send();
        });
    });
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
      this.fileService
        .uploadFileToStorage(this.selectedFile, this.currentPlanet.name, this.signedInUser.userId, this.selectedQuest.questId);
      this.questService.submitQuest(this.currentPlanet.name, this.signedInUser.userId, this.selectedQuest);
      this.navigateDashboard();
    }
  }

  launchClicked() {
    this.questService.launchQuest(this.currentPlanet.name, this.signedInUser.userId, this.selectedQuest);
    this.navigateDashboard();
  }

  viewClicked() {

  }

  sliceHasLoginSucceeded() {
    combineLatest(
      this.store.select(selectors.moderatorSignedIn),
      this.store.select(selectors.userSignedIn)
    ).subscribe(combinedValue => {
      this.moderatorSignedIn = combinedValue[0];
      this.userSignedIn = combinedValue[1];
      if (!this.moderatorSignedIn && !this.userSignedIn) {
        this.navigateLogin();
      }
    });
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if (this.moderatorSignedIn || this.userSignedIn) {
        this.signedInUser = signedInUser;
      }
    });
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if (this.moderatorSignedIn || this.userSignedIn) {
        this.currentPlanet = currentPlanet;
      }
    });
  }

  sliceSelectedQuest() {
    this.store.select(selectors.selectedQuest).subscribe(selectedQuest => {
      if (this.moderatorSignedIn || this.userSignedIn) {
        this.selectedQuest = selectedQuest;
        this.checkStatus();
      }
    });
  }

  sliceAllComments() {
    this.store.select(selectors.allComments).subscribe(allComments => {
      if (this.moderatorSignedIn || this.userSignedIn) {
        this.allComments = allComments;
      }
    });
  }

  sliceCurrentQuestExists() {
    this.store.select(selectors.currentQuestExists).subscribe(currentQuestExists => {
      if (this.moderatorSignedIn || this.userSignedIn) {
        if (currentQuestExists) {
          this.currentQuestExists = true;
        } else if (!currentQuestExists) {
          this.currentQuestExists = false;
        }
      }
    });
  }

  sliceSelectedExplorer() {
    this.store.select(selectors.selectedExplorer).subscribe(selectedExplorer => {
      if (this.moderatorSignedIn) {
        this.selectedExplorer = selectedExplorer;
      }
    });
  }

  ngOnInit() {
    this.sliceHasLoginSucceeded();
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.sliceSelectedQuest();
    this.sliceCurrentQuestExists();
    this.sliceSelectedExplorer();
    this.getDocuments();
  }

}
