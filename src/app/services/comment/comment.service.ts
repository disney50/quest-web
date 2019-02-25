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

  constructor(private angularFirestore: AngularFirestore,
    private questService: QuestService) {

  }

  createComment(planetName: string, userId: string, quest: Quest, comment: string, isModerator: boolean) {
    const newComment = {} as Comment;
    newComment.comment = comment;
    newComment.isModerator = isModerator;
    newComment.timestamp = firebase.firestore.Timestamp.now();
    this.sendComment(planetName, userId, quest.questId, newComment);
  }

  sendComment(planetName: string, userId: string, questId: string, newComment: Comment) {
    this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/' + questId + '/comments').add(newComment);
  }
}
