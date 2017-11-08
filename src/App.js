import React, { Component } from "react";
import { Redirect } from 'react-router'
import "./App.css";
import Header from "./Header";
import ContentRow from "./ContentRow";
import Login from './Login';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
           return (
            <div className="app">
                <Header />
                <ContentRow />    
            </div>    
        );
    }
}

export default App;