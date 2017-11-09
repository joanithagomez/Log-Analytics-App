import React, { Component } from "react";
import { Redirect } from 'react-router'
import "./App.css";
import Header from "./Header";
import ContentRow from "./ContentRow";
import Login from './Login';
import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var self = this;
          
        axios.get('/user.php').then((response) => {            
            if (response.data != "") {
                self.props.onSession(true);                
            }

        });
    }
     
    

    
    render() {

        if (!this.props.loggedIn) {
            return <Login onLogin={this.props.onLogin} />
        }
        else {
            return (
                <div className="app">
                    <Header onLogout={this.props.onLogout} />
                    <ContentRow />
                </div>
            );
        }    
    }
}

export default App;