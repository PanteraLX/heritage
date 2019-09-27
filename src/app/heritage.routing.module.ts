import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonConnectComponent } from './person-connect/person-connect.component';
import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonSearchComponent } from './person-search/person-search.component';
import { PersonComponent } from './person/person.component';
import { PersonsComponent } from './persons/persons.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'person/new', component: PersonCreateComponent},
  {path: 'person/connect', component: PersonConnectComponent},
  {path: 'person/:key', component: PersonComponent},
  {path: 'person', component: PersonSearchComponent},
  {path: 'persons', component: PersonsComponent},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent}
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
