import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { IPerson } from '../../models/person.model';
import { APIService } from '../../services/api/api.service';
// import { data } from './data';
import * as d3 from 'd3';

const width = 932;

interface ITreePerson extends IPerson {
  children?: ITreePerson[];
}

@Component({
  selector: 'heritage-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  public person: ITreePerson;
  public key: string;
  public graph: SVGElement;

  @ViewChild('graphy', {static: true}) graphy: ElementRef<HTMLDivElement>;


  constructor(private route: ActivatedRoute, private apiService: APIService, private router: Router) {
  }

  async ngOnInit() {
    if (this.person) {
      this.graph = this.getGraph(this.person);
      this.graphy.nativeElement.appendChild(this.graph);
      return;
    }

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.graphy.nativeElement.innerHTML = '';
      this.key = paramMap.get('key');
      if (!this.key) {
        return;
      }
      this.apiService.fetch<IPerson>('person' + '/' + this.key)
        .subscribe(async (person: IPerson) => {
          this.getRecursive(person).subscribe((treePerson: ITreePerson) => {
            this.person = treePerson;
            this.graph = this.getGraph(this.person);
            this.graphy.nativeElement.appendChild(this.graph);
          });
        });
    });
  }

  private getRecursive(person: ITreePerson): Observable<ITreePerson> {
    return this.apiService.fetch<IPerson[]>('family/children' + '/' + person._key)
      .pipe(
        map(children => ({parent: person, children})),
        flatMap(parentWithChildIds => forkJoin([
          of(parentWithChildIds.parent),
          ...parentWithChildIds.children.map(child => this.getRecursive(child))
        ])),
        tap(([parent, ...children]) => parent.children = children),
        map(([parent,]) => parent)
      );
  }


  public getGraph(data) {
    const root = this.tree(data);

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

  public tree(data) {
    const root: any = d3.hierarchy(data);
    root.dx = 10;
    root.dy = width / (root.height + 1);
    return d3.tree().nodeSize([root.dx, root.dy])(root);

  }

  private click(d: Node) {
    this.graphy.nativeElement.innerHTML = '';
    this.person = d.data
    this.router.navigate(['/graph', d.data._key]);
  }


}
