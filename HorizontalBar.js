'use strict';
/*
 * USAGE EXAMPLE
 * import HorizontalBar from './HorizontalBar.js';
 *
 * new HorizontalBar('#mount', data, { top: 20, left: 155, bottom: 0, right: 20 }, 500, 350, 'impressions', 'Impressions per video').init();
 */

export default class HorizontalBacr {
  constructor(el, d, m, w, h, k, c) {
    this.mount = el;
    this.data = d;
    this.margin = m;
    this.width = w - this.margin.left - this.margin.right;
    this.height = h - this.margin.top - this.margin.bottom;
    this.key = k;
    this.caption = c;
  }

  init() {
    d3.select('figcaption')
      .html(this.caption);

    const svg = d3.select(this.mount)
       .attr('width', this.width + this.margin.left + this.margin.right)
       .attr('height', this.height + this.margin.top + this.margin.bottom);

    const graph = svg.append('g')
       .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

    const x = d3.scaleLinear()
       .range([0, this.width]);

    const y = d3.scaleBand()
       .paddingInner(0.1)
       .paddingOuter(0.1)
       .range([0, this.height]);

    const xAxis = d3.axisTop(x).ticks(3),
          yAxis = d3.axisLeft(y);

    x.domain([0, d3.max(this.data, d => d[this.key])]),
    y.domain(this.data.map(d => d.topic_name));

    graph.append('g')
        .attr('class', 'x-axis')
        .call(xAxis);

    graph.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

    graph.append('g')
        .attr('fill', '#6978ea')
        .selectAll('rect')
        .data(this.data)
     .enter().append('rect')
        .attr('x', x(0))
        .attr('y', d => y(d.topic_name))
        .attr('width', d => x(d[this.key]))
        .attr('height', y.bandwidth());
  }
}
