import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div >
    <h1>D3.js example</h1>
      <svg width='1000' height='1000'>
      <g transform='scale(1.5)'>
        <circle cx='50' cy='50' r='40' />
        <rect x='100' y='50' width='50' height='20' />
        <circle cx='50' cy='200' r='40' fill='yellow' />
        <rect x='100' y='200' width='50' height='20' fill='blue'/>
        <g transform='translate(20, 300)' fill='green' stroke='red' >
          <circle cx='50' cy='50' stroke-width='5' r='40' />
          <rect x='100' y='50' width='50' height='20' />
        </g>
        <g class='lines' transform='translate(100, 0)'>
          <line fill='red' x1='200' y1='20' x2='300' y2='280' ></line>
          <path fill='none' d='M300 280 L350 200 L350 250 L400 250'></path>
        </g>
        </g>
      </svg>
    </div>
  );
}

export default App;
