import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    AngularFirestore
  ],
  declarations: []
})
export class CoreModule { }
