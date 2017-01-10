import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {SignupComponent} from "./signup/signup.component";
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import { UserEspaceComponent } from './user-espace/user-espace.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', component: MainComponent,
    children: [
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent},
    ]
  },
  {path: 'userespace', component: UserEspaceComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
