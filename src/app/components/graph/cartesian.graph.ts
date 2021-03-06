import * as d3 from 'd3';
import { IFamily } from '../../models/family.model';

const width = 932;

export function getCartesianGraph(descendants: IFamily) {
  let x0 = Infinity;
  let x1 = -x0;

  const root: d3.HierarchyPointNode<unknown> = getTree(descendants);
  root.each(d => {
    if (d.x > x1) {
      x1 = d.x;
    }
    if (d.x < x0) {
      x0 = d.x;
    }
  });

  // @ts-ignore
  const svg = d3.create('svg').attr('viewBox', [0, 0, width, x1 - x0 + root.dx * 2]);

  const g = svg.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    // @ts-ignore
    .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`);

  const link = g.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(root.links())
    .join('path')
    // @ts-ignore
    .attr('d', d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x));

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

function getTree(data: IFamily): d3.HierarchyPointNode<unknown> {
  const root: any = d3.hierarchy(data);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
}

function click(d: Node) {
}
