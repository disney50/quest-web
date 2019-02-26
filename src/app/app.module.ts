import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as reducers from './store/reducers';
import * as effects from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RegisterComponent } from './components/register/register.component';
import { QuestComponent } from './components/quest/quest.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { QuestsComponent } from './components/quests/quests.component';
import { PlanetComponent } from './components/planet/planet.component';
import { CreateComponent } from './components/create/create.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { ModerationComponent } from './components/moderation/moderation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    QuestComponent,
    QuestsComponent,
    PlanetComponent,
    CreateComponent,
    ExplorerComponent,
    ModerationComponent,
    NavigationComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      userState: reducers.userReducer, planetState: reducers.planetReducer,
      explorerState: reducers.explorerReducer, questState: reducers.questReducer, commentState: reducers.commentReducer
    }),
    EffectsModule.forRoot([effects.UserEffects, effects.PlanetEffects, effects.ExplorerEffects,
    effects.QuestEffects, effects.CommentEffects]),
    StoreDevtoolsModule.instrument(),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
