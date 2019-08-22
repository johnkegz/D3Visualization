import React from 'react'
import { 
    select, 
    json, 
    scaleLinear, 
    max, 
    scaleBand, 
    axisLeft,
    axisBottom,
    format
} from 'd3';
import './d3Component.scss';

const d3Component = () => {
    // constants
    const svgWidth = '1000';
    const svgHeight = '300';
    const margin = { top: 24, left:100, bottom:50, right:20 };
    const innerWidth = svgWidth - margin.left - margin.right; 
    const innerHeight = svgHeight - margin.top - margin.bottom; 


    //selecting the svg element from DOM and adding attributes to it
    const svg = select('svg')
        .attr('width', +svgWidth)
        .attr('height', +svgHeight)
        .style('background-color','grey')
        .style('color','white');
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
            .range([0, innerWidth])

        /** 
         * make y Scale using scaleBand
         * it consists of the the domain and the range
        */
        const yScale = scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight])
            .padding(.2)
        
        //Add a group element to group the rectangles
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
        
        //call axisLeft and axisBottom
        const xAxisTickFormat = number => 
                                    format('.3s')(number)
                                    .replace('G', 'B');
        const xAxis = axisBottom(xScale)
                        .tickFormat(xAxisTickFormat);
        g.append('g')
            .call(axisLeft(yScale))
            .selectAll('.domain, .tick line')
            .remove()

        //x Axis group
        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0, ${innerHeight})`)
        //remove x axis line 
        xAxisG.select('.domain')
            .remove()
        //Add x Axis Label
        xAxisG.append('text')
            .attr('y', 39)
            .attr('x', innerWidth/2)
            .text('population')
            .attr('fill', 'black')
        //make a data join to create a rectangles
        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth())
        g.append('text')
            .attr('x', 250)
            .text('10 most populous countries')
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
