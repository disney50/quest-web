import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Upload } from 'src/app/models/upload';
import { QuestService } from '../quest/quest.service';
import { Quest } from 'src/app/models/quest';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  upload: Upload = {} as Upload;

  constructor(
    private angularFirestore: AngularFirestore,
    private questService: QuestService
  ) { }

  uploadFileToStorage(selectedFile: File, planetName: string, userId: string, selectedQuest: Quest): Promise<string> {
    this.upload.name = selectedFile.name;

    const storageRef = firebase.storage().ref();

    return storageRef.child(planetName + '/' + userId + '/' + selectedQuest.questId + '/' + selectedFile.name + '/')
      .put(selectedFile)
      .catch(error => {
        return 'There was a problem, please try again...';
      })
      .then(result => {
        this.addDocumentForUpload(planetName, userId, selectedQuest.questId);
        this.questService.submitQuest(planetName, userId, selectedQuest);
        return 'Your quest was submitted...';
      });


    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (error) => {
    //   console.log(error);
    // });

    // this.addDocumentForUpload(planetName, userId, questId);
  }

  addDocumentForUpload(planetName: string, userId: string, questId: string) {
    this.upload.timestamp = firebase.firestore.Timestamp.now();

    this.getCollectionForUpload(planetName, userId, questId).add(this.upload);
  }

  getCollectionForUpload(planetName: string, userId: string, questId: string): AngularFirestoreCollection {
    return this.angularFirestore.collection(planetName + '/explorers/entries/' + userId + '/quests/' + questId + '/files/');
  }
}
