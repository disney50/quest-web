import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuth,
    AngularFirestore
  ],
  providers: [AuthService],
  declarations: []
})
export class CoreModule { }
