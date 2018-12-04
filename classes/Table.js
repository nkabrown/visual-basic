'use strict';
/*
 * dependencies for custom d3 bundle
 * export { select, selectAll } from 'd3-selection';
 *
 * USAGE EXAMPLE
 * import Table from './Table.js';
 *
 * new Table('#mount', data, 'Table 1').init();
 */

export default class Table {
  constructor(el, data, c) {
    this.mount = el;
    this.data = data;
    this.caption = c;
  }

  init() {
    const figure = d3.select(this.mount);

    figure.select('figcaption')
        .text(this.caption);

    figure.select('thead')
        .append('tr')
        .selectAll('th')
        .data(Object.keys(this.data[0]))
      .enter().append('th')
        .text(d => d);

    const row = figure.select('tbody')
        .selectAll('.row')
        .data(this.data)
      .enter().append('tr')
        .attr('class', 'row');

    row.selectAll('.cell')
        .data(d => Object.values(d))
      .enter().append('td')
         .attr('class', 'cell')
         .text(d => d);
  }
}
