import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from '../../models/comment';
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

  createComment(planetName: string, userId: string, quest: Quest, newComment: string) {
    this.newComment.comment = newComment;
    if (userId === 'moderator') {
      this.newComment.isModerator = true;
      this.questService.updateLastViewCommentDate(planetName, userId, quest);
    } else {
      this.newComment.isModerator = false;
    }
    this.newComment.timestamp = firebase.firestore.Timestamp.now();
    this.sendComment(planetName, userId, quest.questId);
  }

  sendComment(planetName: string, userId: string, questId: string) {
    this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/' + questId + '/comments').add(this.newComment);
  }
}
