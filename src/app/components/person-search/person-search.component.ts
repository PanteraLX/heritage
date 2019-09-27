import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPerson } from '../../models/person';
import { APIService } from '../../services/api/api.service';
interface ISearchPerson {
  givenName?: string;
  surName?: string;
  birthYear?: number;
  deathYear?: number;
}
@Component({
  selector: 'heritage-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.sass']
})
export class PersonSearchComponent implements OnInit {

  public searchPerson: ISearchPerson = {};
  public extendedSearch = true;
  public searchResult: IPerson[];

  constructor(private apiService: APIService, public router: Router) { }

  ngOnInit() {
  }

  public search() {
    const person$: Observable<IPerson[]> = this.apiService.post<IPerson[]>('search', this.searchPerson);
    person$.subscribe((persons: IPerson[]) => this.searchResult = persons);
  }

}
