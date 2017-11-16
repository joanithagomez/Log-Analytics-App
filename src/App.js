import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import ContentRow from "./ContentRow";
import Login from './Login';
import axios from 'axios';

import LoadingPage from './LoadingPage'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        var self = this;
          
        axios.get('/user.php').then((response) => {            
            if (response.data !== "") {
                self.props.onSession(true);                
            }
            this.setState({
                loading: false
            });

        });
    }
    

    
    render() {

        if (this.state.loading) {
            return <LoadingPage show={this.state.loading} />                          
        } 
      
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