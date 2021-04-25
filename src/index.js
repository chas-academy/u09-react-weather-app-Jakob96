import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import './css/weather-icons-wind.min.css';
import './css/weather-icons.min.css';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Grommet>
      <App />
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
