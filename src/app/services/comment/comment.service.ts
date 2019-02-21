import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment, CommentData } from '../../models/comment';
import * as firebase from 'firebase';
import { QuestService } from '../quest/quest.service';
import { Quest } from 'src/app/models/quest';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  newComment: Comment = {} as Comment;

  constructor(private angularFirestore: AngularFirestore,
    private questService: QuestService) {

  }

  createComment(planetName: string, userId: string, quest: Quest, newComment: string, isModerator: boolean) {
    this.newComment.comment = newComment;
    this.newComment.isModerator = isModerator;
    this.newComment.timestamp = firebase.firestore.Timestamp.now();
    this.sendComment(planetName, userId, quest.questId);
  }

  sendComment(planetName: string, userId: string, questId: string) {
    this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/' + questId + '/comments').add(this.newComment);
  }
}
