import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../../models/person.model';
import { APIService } from '../../services/api/api.service';

@Component({
  selector: 'heritage-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.sass']
})
export class PersonFormComponent implements OnInit {

  @Input() person: IPerson;
  @Input() submitting: boolean;

  public dirty = false;
  @Output() onSubmit = new EventEmitter<IPerson>();

  constructor() {
  }

  ngOnInit() {
  }

  public onChange(event: string, attribute: string) {
    switch (attribute) {
      case 'birthDate':
        this.person.birthDate = new Date(event);
        break;
      case 'deathDate':
        this.person.deathDate = new Date(event);
        break;
    }
    this.dirty = true;

  }

}
