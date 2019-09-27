import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { PersonListComponent } from './person-list/person-list.component';
import { FamilyListComponent } from './family-list/family-list.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { AlertComponent } from './alert/alert.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    FooterComponent,
    PersonListComponent,
    FamilyListComponent,
    PersonFormComponent,
    AlertComponent,
    TreeComponent,
    SidebarComponent
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
    FooterComponent,
    PersonListComponent,
    FamilyListComponent,
    PersonFormComponent,
    AlertComponent,
    TreeComponent,
    SidebarComponent
  ]
})
export class CommonComponentsModule {
}
