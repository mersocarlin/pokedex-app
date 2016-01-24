import 'babel/register';


import { render } from 'react-dom';
import FastClick from 'fastclick';


import routes from './routes';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/animate.css';
import './styles/app.scss';


(() => {

  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);

    render(routes, document.getElementById("main"));
  });
})();
