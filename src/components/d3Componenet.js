import React from 'react'
import { 
    select, 
    json, 
    scaleLinear,
    scaleOrdinal,
    schemeCategory10,
    scaleTime, 
    extent,
    max,
    axisLeft,
    axisBottom,
    area,
    curveMonotoneX,
    nest
} from 'd3';
import './d3Component.scss';

const d3Component = () => {
    //Add value accessors
    const xValue = d => d.time;
    const yValue = d => d.number;
    
    // constants
    const title = 'number vs time'
    const svgWidth = '1000';
    const svgHeight = '300';
    const margin = { top: 24, left:100, bottom:50, right:20 };
    const innerWidth = svgWidth - margin.left - margin.right; 
    const innerHeight = svgHeight - margin.top - margin.bottom;
    const circleRadius = 5;
    const xAxisLabel = 'time'
    const yAxisLabel = 'number'

    const colorValue = d => d.type 


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
        /** 
         * make x Scale using scaleLinear
         * it consists of the the domain and the range
        */

        const xScale = scaleTime()
            .domain(extent(data, xValue))
            .range([0, innerWidth])
            // .nice()

        /** 
         * make y Scale using scalePoint
         * it consists of the the domain and the range
        */
        const yScale = scaleLinear()
        .domain([0, max(data, yValue)])
            .range([innerHeight, 0])
            .nice()
        //color scale
        const colorScale = scaleOrdinal()
            .domain(["onBoarding", "offboarding"])
            .range(["#FAEBD7", "#7FFFD4"]);
       
        
        //Add a group element to group the rectangles
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
        
        //call axisLeft and axisBottom
        const xAxis = axisBottom(xScale)
                    .ticks(8)
                    .tickSize(-innerHeight)
                    .tickPadding(5);
        const yAxis = axisLeft(yScale)
                    .tickSize(-innerWidth)
                    .tickPadding(5);

        const yAxisG = g.append('g')
        .call(yAxis)
        
        yAxisG.selectAll('.domain')
            .remove()
        //yAxis group
        yAxisG.append('text')
            .attr('class', 'x-axis-label')
            .attr('y', -60)
            .attr('x', -innerHeight /2)
            .text(yAxisLabel)
            .attr('transform', `rotate(-90)`)
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')

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
            .text(xAxisLabel)
            .attr('fill', 'black')
        //Add line
        const areaGenerator = area()
            .x(d => xScale(xValue(d)))
            .y0(innerHeight)
            .y1(d => yScale(yValue(d)))
            .curve(curveMonotoneX);
        //nest for multiple lines
        const nested = nest()
                .key(colorValue)
                .entries(data);

        colorScale.domain(nested.map(d => d.key))

        g.selectAll('.line-path')
            .data(nested)
            .enter()
            .append('path')
            .attr('class', 'line-path')
            .attr('d', d => areaGenerator(d.values))
            .attr('fill', d => colorScale(d.key))
        
        //make a data join to create a rectangles
        g.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', circleRadius)
        g.append('text')
            .attr('class', 'title')
            .attr('x', 250)
            .text(title)
    }

        //making a request to backend to get the json data to display on the graph
        json('http://localhost:8000/people/d3data' ).then(data => {
            
            data.forEach(d => {
                d.number = +d.number;
                d.time = new Date(d.createdAt);
            })
            console.log('data', data);
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
