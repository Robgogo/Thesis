import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';




import './styles/css/style.css';
// Router 
import {BrowserRouter as Router} from 'react-router-dom';

//require('popper.js');
require('bootstrap');


ReactDOM.render(
    (<Router>
        <App />
    </Router>)
    , 
    document.getElementById('root')
);
