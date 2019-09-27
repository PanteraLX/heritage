import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IPerson } from '../../models/person';

@Component({
  selector: 'heritage-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.sass']
})
export class PersonListComponent implements OnInit {

  @Input() persons: IPerson[];
  @Input() title: string;
  @Input() showBadge: boolean;
  @Input() faIcon: IconDefinition ;

  @Output() buttonPressed = new EventEmitter<IPerson>();

  public faUser: IconDefinition = faUser;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

}
