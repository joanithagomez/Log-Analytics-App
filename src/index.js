import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import './normalize.css';
import './index.css';

import Home from "./Home";
// import Login from './Login';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<BrowserRouter><Home/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
