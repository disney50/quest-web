import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from '../../models/comment';
import { Timestamp } from '@firebase/firestore-types';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  newComment: Comment = {} as Comment;

  constructor(private angularFirestore: AngularFirestore) {

  }

  createCommentId(): string {    
    const commentId = this.angularFirestore.createId();
    return commentId;
  }

  createTimestamp(): Timestamp {
    const timestamp = firebase.firestore.Timestamp.now();
    return timestamp;
  }

  createComment(newComment: string): Comment {
    this.newComment.commentId = this.createCommentId();
    this.newComment.comment = newComment;
    this.newComment.isModerator = false;
    this.newComment.timestamp = this.createTimestamp();
    return this.newComment;
  }

  sendComment(planetName: string, userId: string, questId: string, newComment: Comment) {
    this.angularFirestore.collection(planetName + "/explorers/entries/" + userId + "/quests/" + questId + "/comments").doc(newComment.commentId).set(newComment);
  }
}
