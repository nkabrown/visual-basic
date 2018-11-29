'use strict';
/*
 * USAGE EXAMPLE
 * import DotPlot from './DotPlot.js';
 *
 * new DotPlot('#mount', data, { top: 20, left: 155, bottom: 20, right: 20 }, 500, 350, 'impressions', 'Impressions per video').init();
 */

export default class DotPlot {
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
    const svg = d3.select(this.mount)
       .attr('width', this.width + this.margin.left + this.margin.right)
       .attr('height', this.height + this.margin.top + this.margin.bottom);

    const graph = svg.append('g')
       .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const x = d3.scaleLinear()
       .range([0, this.width]);

    const y = d3.scalePoint()
       .padding(0.5)
       .range([0, this.height]);

    const xAxis = d3.axisBottom(x)
        .ticks(4)
        .tickSize(-this.height);

    const yAxis = d3.axisLeft(y)
        .tickSize(-this.width);

    x.domain([0, d3.max(this.data, d => d[this.key])]),
    y.domain(this.data.map(d => d.topic_name));

    graph.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(xAxis);

    graph.append('g')
       .attr('class', 'y-axis')
       .call(yAxis);

    const that = this;
    d3.selectAll('.graph2 .y-axis .tick')
        .each(function(d) {
          const datum = that.data.filter(datum => {
            return datum.topic_name == d;
          });

          const tick = d3.select(this).select('line');
          tick.attr('x2', x(datum[0][that.key]));
        });

    d3.selectAll('.tick > line')
        .attr('stroke', 'rgba(23, 58, 217, 0.2)');

    d3.select('.x-axis > .tick > line')
        .style('display', 'none');

    graph.append('g')
        .attr('fill', '#173ad9')
        .selectAll('circle')
        .data(this.data)
     .enter().append('circle')
        .attr('cx', d => x(d[this.key]))
        .attr('cy', d => y(d.topic_name))
        .attr('r', 3.5);
  }
}
