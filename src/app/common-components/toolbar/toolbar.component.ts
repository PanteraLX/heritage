import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPerson } from '../../models/person';
import { IUser } from '../../models/user';
import { APIService } from '../../services/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'heritage-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public searchString: string;
  public closeResult: string;

  public persons: IPerson[];

  public currentUser: IUser;


  @ViewChild(TemplateRef, {static: false}) content;

  constructor(private apiService: APIService,
              private modalService: NgbModal,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  public search() {
    if (!this.searchString) {
      return;
    }
    const person$: Observable<IPerson[]> = this.apiService.fetch<IPerson[]>('search', {query: this.searchString});
    person$.subscribe(async (persons: IPerson[]) => {
      this.persons = persons;
      await this.modalService.open(this.content, {size: 'xl', scrollable: true, ariaLabelledBy: 'modal-basic-title'});
    });
  }

  public async onButtonPressed(event: IPerson, modal) {
    await this.router.navigate(['person', event._key]);
    await modal.dismiss();
  }

  public async onKeyPressed(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.search();
    }
  }

  public async logout() {
    this.authenticationService.logout();
    await this.router.navigate(['/login']);
  }
}
