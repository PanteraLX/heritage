import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginFormComponent } from './login-form/login-form.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { PersonListComponent } from './person-list/person-list.component';
import { FamilyListComponent } from './family-list/family-list.component';
import { PersonFormComponent } from './person-form/person-form.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    LoginFormComponent,
    FooterComponent,
    PersonListComponent,
    FamilyListComponent,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    ToolbarComponent,
    LoginFormComponent,
    FooterComponent,
    PersonListComponent,
    FamilyListComponent,
    PersonFormComponent
  ]
})
export class HeritageCommonModule {
}
