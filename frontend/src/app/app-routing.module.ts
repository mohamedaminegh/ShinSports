import { AddMatchComponent } from './add-match/add-match.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DisplayTeamComponent } from './display-team/display-team.component';
import { DisplayPlayerComponent } from './display-player/display-player.component';
import { FrontPageComponent } from './front-page/front-page.component';
import {DisplayMatchesComponent} from './display-matches/display-matches.component'
import {DisplayCategoryMatchesComponent} from'./display-category-matches/display-category-matches.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {PageNotFoundComponentComponent} from './page-not-found-component/page-not-found-component.component'
const routes: Routes = [
  {path: '' , component: FrontPageComponent },
  {path: 'matches' , component: DisplayMatchesComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'addCategory', component: AddCategoryComponent},
  {path: 'addPlayer', component: AddPlayerComponent},
  {path: 'addTeam', component: AddTeamComponent},
  {path: 'displayTeam/:id', component: DisplayTeamComponent},
  {path: 'displayPlayer/:id', component: DisplayPlayerComponent},
  {path: 'addMatch', component: AddMatchComponent},
  {path: 'category/:name', component: DisplayCategoryMatchesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: PageNotFoundComponentComponent}
];

export const ROUTING = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
