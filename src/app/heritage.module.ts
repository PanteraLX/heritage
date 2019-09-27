import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './components/components.module';
import { HeritageComponent } from './heritage.component';
import { HeritageRoutingModule } from './heritage.routing.module';
import { CommonComponentsModule } from './common-components/common.module';

@NgModule({
  declarations: [
    HeritageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    HeritageRoutingModule,
    CommonComponentsModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [
    HeritageComponent
  ]
})
export class HeritageModule {
}
