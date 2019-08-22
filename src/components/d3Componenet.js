import React from 'react'
import { 
    select, 
    json, 
    scaleLinear, 
    extent,
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
    /** 
     * Defining the render function
     * 
     * */
    const render = data => {
                // d.mpg = +d.mpg;
                // d.cylinders= +d.cylinders;
                // d.displacement= +d.displacement;
                // d.horsePower= +d.horsePower;
                // d.weight= +d.weight;
                // d.acceleration= +d.acceleration;
                // d.year= +d.year;
        //Add value accessors
        const xValue = d => d.horsePower;
        const yValue = d => d.cylinders;
        
        /** 
         * make x Scale using scaleLinear
         * it consists of the the domain and the range
        */

        const xScale = scaleLinear()
            .domain(extent(data, xValue))
            .range([0, innerWidth])
            .nice()

        /** 
         * make y Scale using scalePoint
         * it consists of the the domain and the range
        */
        const yScale = scaleLinear()
        .domain(extent(data, yValue))
            .range([0, innerHeight])
        
        //Add a group element to group the rectangles
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
        
        //call axisLeft and axisBottom
        const xAxisTickFormat = number => 
                                    format('.3s')(number)
                                    .replace('G', 'B');
        const xAxis = axisBottom(xScale)
                        .tickFormat(xAxisTickFormat)
                        .tickSize(-innerHeight);
        const yAxis = axisLeft(yScale)
                    .tickSize(-innerWidth);
        g.append('g')
            .call(yAxis)
            .selectAll('.domain')
            .remove()

        //x Axis group
        const xAxisG = g.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${innerHeight})`)
        //remove x axis line 
        xAxisG.select('.domain')
            .remove()
        //Add x Axis Label
        xAxisG.append('text')
            .attr('class', 'x-axis-label')
            .attr('y', 39)
            .attr('x', innerWidth/2)
            .text('population')
            .attr('fill', 'black')
        //make a data join to create a rectangles
        g.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', 10)
        g.append('text')
            .attr('class', 'title')
            .attr('x', 150)
            .text('10 most populous countries')
    }

        //making a request to backend to get the json data to display on the graph
        json('http://localhost:8000/people/d3data' ).then(data => {
            console.log('data', data);
            data.forEach(d => {
                d.mpg = +d.mpg;
                d.cylinders= +d.cylinders;
                d.displacement= +d.displacement;
                d.horsePower= +d.horsePower;
                d.weight= +d.weight;
                d.acceleration= +d.acceleration;
                d.year= +d.year;
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
