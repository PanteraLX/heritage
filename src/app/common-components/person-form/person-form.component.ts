import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../../models/person';
import { APIService } from '../../services/api/api.service';

@Component({
  selector: 'heritage-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.sass']
})
export class PersonFormComponent implements OnInit {

  @Input() person: IPerson;

  public submitting = false;
  public dirty = false;

  constructor(private apiService: APIService) {
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.submitting = true;
    this.person.lastUpdated = new Date();
    const person$: Observable<IPerson> = this.apiService.post<IPerson>('person', this.person);
    person$.subscribe(() => {
      setTimeout(() => this.submitting = false, 500);
    });
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
