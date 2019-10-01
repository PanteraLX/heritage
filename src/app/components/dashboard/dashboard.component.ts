import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPerson } from '../../models/person.model';
import { chain } from 'lodash';
import { APIService } from '../../services/api/api.service';

interface IGroup<T> {
  key: string;
  values: T[];
}
type IPersonsPerName = IGroup<IPerson>;
type INamesPerInitial = IGroup<IPersonsPerName>;

@Component({
  selector: 'heritage-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private persons: IPerson[];
  private initialGroups: INamesPerInitial[];
  private namesPerInitial: INamesPerInitial;
  private personsPerName: IPersonsPerName;

  constructor(
    private apiService: APIService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async queryParams => {
      if (!this.persons) {
        this.persons = await this.apiService.fetch<IPerson[]>('person').toPromise();
      }
      this.groupPersons();
      await this.selectNameGroup(queryParams.initial);
      await this.selectName(queryParams.name);
    });
  }

  private groupPersons() {
    this.initialGroups = chain(this.persons)
      .sortBy('givenName')
      .groupBy('surName')
      .map((value, key) => ({key, values: value}))
      .sortBy('key')
      .groupBy((nameGroup) => nameGroup.key.charAt(0).toUpperCase())
      .map((value, key) => ({key, values: value}))
      .sortBy('key')
      .value();
  }

  public async selectNameGroup(key: string) {
    if (!key) {
      return;
    }
    this.namesPerInitial = this.initialGroups.filter((charGroup) => charGroup.key === key).shift();
    this.personsPerName = null;
  }

  public async selectName(key: string) {
    if (!key || !this.namesPerInitial) {
      return;
    }
    this.personsPerName = this.namesPerInitial.values.filter((nameGroup) => nameGroup.key === key).shift();
  }
}
