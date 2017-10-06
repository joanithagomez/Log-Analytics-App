import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

class App extends Component{
    render() {
        return (
            <div className="app">
                <Header />
                <Sidebar />
                <Content />
            </div>    
        );
    }
}

export default App;