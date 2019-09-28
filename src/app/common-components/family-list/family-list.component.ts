import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IFamily } from '../../models/family.model';
import { Relation } from '../../models/relation.model';
import { APIService } from '../../services/api/api.service';

@Component({
  selector: 'heritage-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.sass']
})
export class FamilyListComponent implements OnInit {
  @Input() family: IFamily;

  @Output() onListAction = new EventEmitter<string>();
  public relation = Relation;

  constructor(private apiService: APIService, public router: Router) {
  }

  ngOnInit() {
  }
}
