import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponentsModule } from '../common-components/common.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PersonConnectComponent } from './person-connect/person-connect.component';
import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonSearchComponent } from './person-search/person-search.component';
import { PersonComponent } from './person/person.component';
import { PersonsComponent } from './persons/persons.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PersonCreateComponent,
    PersonConnectComponent,
    PersonsComponent,
    PersonComponent,
    PersonSearchComponent,
    LoginComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    CommonModule,
    CommonComponentsModule,
    RouterModule
  ], exports: [
    DashboardComponent,
    PersonCreateComponent,
    PersonConnectComponent,
    PersonsComponent,
    PersonComponent,
    PersonSearchComponent,
    LoginComponent,
    UserComponent,
  ]
})
export class ComponentsModule {
}
