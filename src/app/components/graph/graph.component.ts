import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IFamily } from '../../models/family.model';
import { IPerson } from '../../models/person.model';
import { APIService } from '../../services/api/api.service';
import * as d3 from 'd3';
import { getCartesianGraph } from './cartesian.graph';
import { getRadialGraph } from './collapsible.graph';

const width = 932;

@Component({
  selector: 'heritage-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  private family: IFamily;
  private key: string;
  private graph: SVGElement;
  private root: d3.HierarchyPointNode<unknown>;

  @ViewChild('graphElement', {static: true}) graphElement: ElementRef<HTMLDivElement>;

  constructor(private route: ActivatedRoute, private apiService: APIService, private router: Router) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.graphElement.nativeElement.innerHTML = '';
      this.key = paramMap.get('key');
      if (!this.key) {
        return;
      }
      this.apiService.fetch<IFamily>('family/descendants' + '/' + this.key)
        .subscribe(async (person: IFamily) => {
          this.family = person;
          this.graph = getRadialGraph(person);
          this.graphElement.nativeElement.appendChild(this.graph);
        });
    });
  }
}
