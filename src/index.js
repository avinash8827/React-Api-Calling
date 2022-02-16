import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import App3 from './App3';
import InfiniteScroll2 from './InfiniteScroll2';



// ReactDOM.render(What,Where);
ReactDOM.render(
  <React.StrictMode>
    <InfiniteScroll2 />
  </React.StrictMode>,
  document.getElementById('root')
);
