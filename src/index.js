import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './normalize.css';
import './index.css';

import Home from "./Home";


ReactDOM.render(<BrowserRouter><Home/></BrowserRouter>, document.getElementById('root'));
