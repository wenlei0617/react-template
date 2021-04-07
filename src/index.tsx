import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import AppRoute from './AppRoute';

if (process.env.REACT_APP_CONSOLE_LOG === '1') {
  const VConsole = require('vconsole');
  new VConsole();
}

ReactDOM.render(
  <HashRouter>
    <AppRoute/>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
