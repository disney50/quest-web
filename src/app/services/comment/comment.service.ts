import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from '../../models/comment';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  newComment: Comment = {} as Comment;

  constructor(private angularFirestore: AngularFirestore) {

  }

  createComment(newComment: string): Comment {
    this.newComment.comment = newComment;
    this.newComment.isModerator = false;
    this.newComment.timestamp = firebase.firestore.Timestamp.now();
    return this.newComment;
  }

  sendComment(planetName: string, userId: string, questId: string, newComment: Comment) {
    this.angularFirestore.collection(planetName + "/explorers/entries/" + userId + "/quests/" + questId + "/comments").add(newComment);
  }
}
