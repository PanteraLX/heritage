import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPerson } from '../models/person';
import { APIService } from '../api/api.service';

@Component({
  selector: 'heritage-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.sass']
})
export class FamilyListComponent implements OnInit, OnChanges {
  public children: IPerson[];
  public parents: IPerson[];
  public partners: IPerson[];

  @Input() person: IPerson;

  constructor(private apiService: APIService, public router: Router) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.person) {
      this.loadFamily();
    }
  }

  ngOnInit() {
  }

  private loadFamily() {
    const children$: Observable<IPerson[]> = this.apiService.fetch<IPerson[]>('children' + '/' + this.person._key);
    children$.subscribe((children: IPerson[]) => this.children = children);

    const parents$: Observable<IPerson[]> = this.apiService.fetch<IPerson[]>('parents' + '/' + this.person._key);
    parents$.subscribe((parents: IPerson[]) => this.parents = parents);

    const partners$: Observable<IPerson[]> = this.apiService.fetch<IPerson[]>('partners' + '/' + this.person._key);
    partners$.subscribe((partners: IPerson[]) => this.partners = partners);
  }


}
