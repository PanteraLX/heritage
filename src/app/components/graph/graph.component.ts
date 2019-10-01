import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IFamily } from '../../models/family.model';
import { APIService } from '../../services/api/api.service';
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
  public direction: 'descendants' | 'ancestors' = 'descendants';

  @ViewChild('graphElement', {static: true}) graphElement: ElementRef<HTMLDivElement>;

  constructor(private route: ActivatedRoute, private apiService: APIService, private router: Router) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.key = paramMap.get('key');
      if (!this.key) {
        return;
      }
      this.drawGraph(this.direction);
    });
  }

  public drawGraph(direction: 'descendants' | 'ancestors') {
    this.direction = direction;
    this.graphElement.nativeElement.innerHTML = '';
    this.apiService.fetch<IFamily>(`family/${direction}/` + this.key)
      .subscribe(async (person: IFamily) => {
        this.family = person;
        this.graph = getRadialGraph(person);
        this.graphElement.nativeElement.appendChild(this.graph);
      });
  }
}
