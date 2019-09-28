import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IPerson } from '../../models/person.model';

@Component({
  selector: 'heritage-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.sass']
})
export class PersonListComponent implements OnInit {

  @Input() persons: IPerson[];
  @Input() title: string;
  @Input() showListBadge: boolean;
  @Input() showListActionButton: boolean;

  @Input() userActionIcon: IconDefinition;
  @Input() listActionIcon: IconDefinition = faPlus;

  @Output() onUserAction = new EventEmitter<IPerson>();
  @Output() onListAction = new EventEmitter<IPerson>();

  public faUser: IconDefinition = faUser;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

}
