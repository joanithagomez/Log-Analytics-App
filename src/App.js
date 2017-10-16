import React, { Component } from "react";
import { Redirect } from 'react-router'
import "./App.css";
import Header from "./Header";
import ContentRow from "./ContentRow";



class App extends Component {
    constructor(props) {
        super(props);
        // this.check = this.check.bind(this);        
    }

    render() {
        console.log("login", this.props.login);
        
        if (!this.props.login) {
           return <Redirect to ="/login"/>            
        }
        else
            return (
            <div className="app">
                <Header />
                <ContentRow />    
            </div>    
        );
    }
}

export default App;