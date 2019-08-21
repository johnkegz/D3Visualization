import React from 'react'
import { select, json } from 'd3';

const d3Component = () => {
    const svgWidth = 1000;
    const svgHeight = 300;
    const svg = select('svg')
        .attr('width', +svgWidth)
        .attr('height', +svgHeight)
        .style('background-color','red');

        json('http://localhost:8000/people/d3data' ).then(data => {
            data.forEach(d => {
                d.population = d.population * 1000;
            })
            console.log('data+++', data);
        });


















    // const rect = svg.append('rect')
    //     .attr('x', 30)
    //     .attr('y', 40)
    //     .attr('width', 30)
    //     .attr('height', 30);
    return true;
}

export default d3Component;
