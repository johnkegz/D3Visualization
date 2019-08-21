import React from 'react'
import { select, json, scaleLinear, max, scaleBand } from 'd3';

const d3Component = () => {
    // constants
    const svgWidth = 1000;
    const svgHeight = 300;


    //selecting the svg element from DOM and adding attributes to it
    const svg = select('svg')
        .attr('width', +svgWidth)
        .attr('height', +svgHeight)
        .style('background-color','red');
    /** 
     * Defining the render function
     * 
     * */
    const render = data => {
        //Add value accessors
        const xValue = d => d.population;
        const yValue = d => d.country
        /** 
         * make x Scale using scaleBand
         * it consists of the the domain and the range
        */

        const xScale = scaleLinear()
            .domain([0, max(data, xValue)])
            .range([0, svgWidth])
            
        /** 
         * make y Scale using scaleBand
         * it consists of the the domain and the range
        */
        const yScale = scaleBand()
            .domain(data.map(yValue))
            .range([0, svgHeight])
            
        //make a data join to create a rectangles
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth())
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
