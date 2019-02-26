import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { QuestComponent } from './components/quest/quest.component';
import { QuestsComponent } from './components/quests/quests.component';
import { PlanetComponent } from './components/planet/planet.component';
import { CreateComponent } from './components/create/create.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { ModerationComponent } from './components/moderation/moderation.component';
import { CommentsComponent } from './components/comments/comments.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quest', component: QuestComponent },
  { path: 'quests', component: QuestsComponent },
  { path: 'planet', component: PlanetComponent },
  { path: 'create', component: CreateComponent },
  { path: 'explorer', component: ExplorerComponent },
  { path: 'moderation', component: ModerationComponent },
  { path: 'comments', component: CommentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
