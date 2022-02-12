import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App2 from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// ReactDOM.render(What,Where);
ReactDOM.render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>,
  document.getElementById('root')
);
