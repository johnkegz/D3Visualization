import React from 'react'
import { select, json } from 'd3';

const d3Component = () => {
    // constants
    const svgWidth = 1000;
    const svgHeight = 300;


    //selecting the svg element from DOM and adding attributes to it
    const svg = select('svg')
        .attr('width', +svgWidth)
        .attr('height', +svgHeight)
        .style('background-color','red');
    //Defining the render function
    const render = data => {
        //make a data join to create a rectangles
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', 300)
            .attr('height', 300)
    }

    //making a request to backend to get the json data to display on the graph
        json('http://localhost:8000/people/d3data' ).then(data => {
            data.forEach(d => {
                d.population = d.population * 1000;
            })
            //call render function to display the data
            render(data);
        });


















    // const rect = svg.append('rect')
    //     .attr('x', 30)
    //     .attr('y', 40)
    //     .attr('width', 30)
    //     .attr('height', 30);
    return true;
}

export default d3Component;
