import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IPerson } from '../common/models/person';
import { APIService } from '../common/api/api.service';

@Component({
  selector: 'heritage-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass']
})
export class PersonComponent implements OnInit {

  public person: IPerson;
  public key: string = undefined;

  constructor(private apiService: APIService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.key = paramMap.get('key');
      if (!this.key) {
        return;
      }
      const person$: Observable<IPerson> = this.apiService.fetch<IPerson>('person' + '/' + this.key);
      person$.subscribe((person: IPerson) => this.person = person);
    });
  }
}
