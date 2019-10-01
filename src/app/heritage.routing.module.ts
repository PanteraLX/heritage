import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GraphComponent } from './components/graph/graph.component';
import { PersonCleanupComponent } from './components/person-cleanup/person-cleanup.component';
import { PersonConnectComponent } from './components/person-connect/person-connect.component';
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PersonSearchComponent } from './components/person-search/person-search.component';
import { PersonComponent } from './components/person/person.component';
import { PersonsComponent } from './components/persons/persons.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'cleanup-person', component: PersonCleanupComponent, canActivate: [AuthGuard]},
  {path: 'create-person', component: PersonCreateComponent, canActivate: [AuthGuard]},
  {path: 'person/connect', component: PersonConnectComponent, canActivate: [AuthGuard]},
  {path: 'person/:key', component: PersonComponent, canActivate: [AuthGuard]},
  {path: 'person', component: PersonSearchComponent, canActivate: [AuthGuard]},
  {path: 'persons', component: PersonsComponent, canActivate: [AuthGuard]},
  {path: 'graph/:key', component: GraphComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class HeritageRoutingModule {
}
