import React, { Component } from 'react'
import d3Component from './components/d3Componenet';

export default class App extends Component {
  componentDidMount(){
    d3Component()
  }
  render() {
    return (
      <div>
        <svg className='svgDiv'>
        </svg>
      </div>
    )
  }
}

