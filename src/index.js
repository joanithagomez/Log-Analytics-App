import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import './normalize.css';
import './index.css';

import Home from "./Home";


ReactDOM.render(<BrowserRouter><Home/></BrowserRouter>, document.getElementById('root'));
