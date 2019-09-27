import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonConnectComponent } from './person-connect/person-connect.component';
import { PersonCreateComponent } from './person-create/person-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeritageComponent } from './heritage.component';
import { HeritageRoutingModule } from './heritage.routing.module';
import { HeritageCommonModule } from './common/common.module';
import { LoginComponent } from './login/login.component';
import { PersonSearchComponent } from './person-search/person-search.component';
import { PersonComponent } from './person/person.component';
import { PersonsComponent } from './persons/persons.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { TreeComponent } from './common/tree/tree.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    HeritageComponent,
    PersonsComponent,
    PersonComponent,
    PersonSearchComponent,
    LoginComponent,
    UserComponent,
    SidebarComponent,
    TreeComponent,
    DashboardComponent,
    PersonCreateComponent,
    PersonConnectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    HeritageRoutingModule,
    HeritageCommonModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [
    HeritageComponent
  ]
})
export class HeritageModule {
}
