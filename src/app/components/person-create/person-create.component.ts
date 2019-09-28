import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPerson } from '../../models/person.model';
import { APIService } from '../../services/api/api.service';

@Component({
  selector: 'heritage-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.sass']
})
export class PersonCreateComponent implements OnInit {

  public person: IPerson;
  public submitting = false;

  constructor(private apiService: APIService, private router: Router) {
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

  public submit() {
    this.submitting = true;
    this.person.lastUpdated = new Date();
    this.apiService.post<IPerson>('person', this.person)
      .subscribe((person) => {
        setTimeout(() => {
          this.submitting = false;
          this.router.navigate(['/person', person._key]);
        }, 500);
      });
  }

}
