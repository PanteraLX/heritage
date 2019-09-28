import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IFamily } from '../../models/family.model';
import { IPerson } from '../../models/person.model';
import { APIService } from '../../services/api/api.service';
import * as d3 from 'd3';

const width = 932;

@Component({
  selector: 'heritage-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  private person: IFamily;
  private key: string;
  private graph: SVGElement;
  private root: d3.HierarchyPointNode<unknown>;

  @ViewChild('graphElement', {static: true}) graphElement: ElementRef<HTMLDivElement>;

  constructor(private route: ActivatedRoute, private apiService: APIService, private router: Router) {
  }

  async ngOnInit() {
    if (this.person) {
      this.graph = this.getGraph(this.person);
      this.graphElement.nativeElement.appendChild(this.graph);
      return;
    }

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.graphElement.nativeElement.innerHTML = '';
      this.key = paramMap.get('key');
      if (!this.key) {
        return;
      }
      this.apiService.fetch<IFamily>('family/descendants' + '/' + this.key)
        .subscribe(async (person: IPerson) => {
          this.person = person;
          this.root = this.getTree(this.person);
          this.graph = this.getGraph(this.root);
          this.graphElement.nativeElement.appendChild(this.graph);
        });
    });
  }

  public getGraph(root) {
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
      if (d.x > x1) {
        x1 = d.x;
      }
      if (d.x < x0) {
        x0 = d.x;
      }
    });

    const svg = d3.create('svg')
      .attr('viewBox', [0, 0, width, x1 - x0 + root.dx * 2]);

    const g = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`);

    const link = g.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')

      .attr('d', d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x));

    const node = g.append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('fill', d => d.children ? '#555' : '#999')
      .attr('r', 2.5)
      .on('click', (d) => this.click(d));

    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -6 : 6)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.givenName + ' ' + d.data.surName)
      .clone(true).lower()
      .attr('stroke', 'white');

    return svg.node();
  }

  public getTree(data: IFamily): d3.HierarchyPointNode<unknown> {
    const root: any = d3.hierarchy(data);
    root.dx = 10;
    root.dy = width / (root.height + 1);
    return d3.tree().nodeSize([root.dx, root.dy])(root);
  }

  private click(d: Node) {
  }
}
