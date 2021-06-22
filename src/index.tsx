import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './services/firebase'
import './styles/global.scss' // importação ( yarn add node-sass@^5.0.0) arquivo global é importado no index

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);