import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IPerson } from '../../models/person';
import { APIService } from '../../services/api/api.service';


@Component({
  selector: 'heritage-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.sass']
})
export class PersonsComponent implements OnInit {

  public persons$: Observable<IPerson[]>;
  public page = 1;
  public faUser = faUser;

  constructor(private apiService: APIService) {
  }

  ngOnInit() {
    this.persons$ = this.apiService.fetch<IPerson[]>('person', {limit: 10, offset: 0});
  }

  onPageChange() {
    this.persons$ = this.apiService.fetch<IPerson[]>('person', {limit: 10, offset: (this.page - 1) * 10});
  }
}
