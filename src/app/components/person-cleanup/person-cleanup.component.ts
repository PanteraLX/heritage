import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../models/person.model';
import { APIService } from '../../services/api/api.service';
import { chain } from 'lodash';

@Component({
  selector: 'heritage-person-cleanup',
  templateUrl: './person-cleanup.component.html',
  styleUrls: ['./person-cleanup.component.sass']
})
export class PersonCleanupComponent implements OnInit {
  private persons: IPerson[];

  constructor(private apiService: APIService) {
  }

  ngOnInit() {
    this.apiService.fetch<IPerson[]>('person')
      .subscribe((persons: IPerson[]) => {
        this.persons = persons;

        this.groupPersons();
      });
  }

  private groupPersons() {
    const namegroups = chain(this.persons)
    // Group the elements of Array based on `color` property
      .groupBy((person: IPerson) => person.surName)
      // `key` is group's name (color), `value` is the array of objects
      .map((value, key) => ({surName: key, persons: value}))
      .value()
      .sort((a, b) => a.surName.localeCompare(b.surName))

    const chargroups = chain(namegroups)
    // Group the elements of Array based on `color` property
      .groupBy((nameGroup) => nameGroup.surName.charAt(0).toUpperCase())
      // `key` is group's name (color), `value` is the array of objects
      .map((value, key) => ({key: key, groups: value}))
      .value()
      .sort((a, b) => a.key.localeCompare(b.key))
console.log(namegroups);


    console.log(chargroups);


  }

}
