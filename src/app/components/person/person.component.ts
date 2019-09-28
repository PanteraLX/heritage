import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IconDefinition, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IFamily } from '../../models/family.model';
import { IPerson } from '../../models/person.model';
import { APIService } from '../../services/api/api.service';

@Component({
  selector: 'heritage-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass']
})
export class PersonComponent implements OnInit {

  public person: IFamily;
  public key: string = undefined;

  public faProjectDiagram: IconDefinition = faProjectDiagram;

  constructor(private apiService: APIService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.key = paramMap.get('key');
      if (!this.key) {
        return;
      }
      this.apiService.fetch<IFamily>('family' + '/' + this.key)
        .subscribe((person: IFamily) => this.person = person);
    });
  }
}
