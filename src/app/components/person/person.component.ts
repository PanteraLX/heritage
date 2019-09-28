import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IconDefinition, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IFamily } from '../../models/family.model';
import { IPerson } from '../../models/person.model';
import { Relation } from '../../models/relation.model';
import { APIService } from '../../services/api/api.service';

@Component({
  selector: 'heritage-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass']
})
export class PersonComponent implements OnInit {

  public person: IFamily;
  public persons: IPerson[];
  public key: string = undefined;

  public faProjectDiagram: IconDefinition = faProjectDiagram;

  private submitting: boolean;

  @ViewChild(TemplateRef, {static: false}) content;
  private relationship: string;

  constructor(private apiService: APIService, private route: ActivatedRoute, private modalService: NgbModal) {

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

  public onSubmit() {
    this.submitting = true;
    this.person.lastUpdated = new Date();
    this.apiService.update<IPerson>('person', this.person)
      .subscribe(() => {
        setTimeout(() => this.submitting = false, 500);
      });
  }

  public async onListAction(event: string) {
    this.relationship = event;
    await this.modalService.open(this.content, {scrollable: true});
  }

  public async onButtonPressed(relation: IPerson) {
    const options: { _from?: IPerson, _to?: IPerson } = {};
    switch (this.relationship) {
      case Relation.PARENT:
        options._from = relation;
        options._to = this.person;
        break;
      case Relation.PARTNER:
        options._from = this.person;
        options._to = relation;
        break;
      case Relation.CHILD:
        options._from = this.person;
        options._to = relation;
        break;
    }
    const edgeCollection = this.relationship === Relation.PARENT || this.relationship === Relation.CHILD ? 'parentHood' : 'marriage';

    console.log(this.relationship === Relation.CHILD, this.relationship === Relation.PARENT);

    console.log(this.relationship, edgeCollection);

    this.apiService.post<IFamily>(`family/${edgeCollection}/${this.person._key}`, options)
      .subscribe(async (persons: IFamily) => {
        this.person = persons;
        this.modalService.dismissAll();
      });
  }

  public search(searchString) {
    if (!searchString) {
      return;
    }
    this.apiService.fetch<IPerson[]>('search', {query: searchString})
      .subscribe(async (persons: IPerson[]) => {
        this.persons = persons;
      });
  }
}
