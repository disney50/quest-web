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
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { RegisterComponent } from './components/register/register.component';
import { QuestComponent } from './components/quest/quest.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { QuestsComponent } from './components/quests/quests.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    QuestComponent,
    QuestsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({userState: reducers.userReducer, planetState: reducers.planetReducer, explorerState: reducers.explorerReducer, questState: reducers.questReducer, commentState: reducers.commentReducer}),
    EffectsModule.forRoot([effects.UserEffects, effects.PlanetEffects, effects.ExplorerEffects, effects.QuestEffects, effects.CommentEffects]),
    StoreDevtoolsModule.instrument(),
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
