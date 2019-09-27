import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../models/person';

@Component({
  selector: 'heritage-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.sass']
})
export class PersonCreateComponent implements OnInit {

  public person: IPerson;

  constructor() {
    this.person = {
      givenName: '',
      surName: '',
      sex: 'U',
      birthDate: new Date(),
      birthPlace: '',
      dead: false,
      lastUpdated: new Date(),
    };
  }

  ngOnInit() {
  }

}
