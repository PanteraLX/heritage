import { Component, OnInit } from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IPerson } from '../common/models/person';
import { APIService } from '../common/api/api.service';

@Component({
  selector: 'heritage-person-connect',
  templateUrl: './person-connect.component.html',
  styleUrls: ['./person-connect.component.sass']
})
export class PersonConnectComponent implements OnInit {

  public persons1: IPerson[] = [];
  public persons2: IPerson[] = [];

  public person1: IPerson;
  public person2: IPerson;

  public searchString1: string;
  public searchString2: string;

  public faIcon: IconDefinition = faPlus;


  constructor(private apiService: APIService) {
  }

  ngOnInit() {
  }

  public search1() {
    const person$: Observable<IPerson[]> = this.apiService.fetch<IPerson[]>('search', {query: this.searchString1});
    person$.subscribe(async (persons: IPerson[]) => {
      this.persons1 = persons;
    });
  }

  public search2() {
    const person$: Observable<IPerson[]> = this.apiService.fetch<IPerson[]>('search', {query: this.searchString2});
    person$.subscribe(async (persons: IPerson[]) => {
      this.persons2 = persons;
    });
  }

  public onButtonPressed1(event: IPerson) {
    console.log(event);
    this.person1 = event;
    this.persons1 = null
  }

  public onButtonPressed2(event) {
    console.log(event);
    this.person2 = event;
  }
}
