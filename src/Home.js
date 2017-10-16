import React, { Component } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Login from './Login';
import App from './App';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            name: "foo"
        };
        this.handleLogIn = this.handleLogIn.bind(this);        
    }

    
    handleLogIn(cb) {
        console.log('logging in');
        this.setState({ loggedIn: true }, cb);
    }
    render() {
        console.log("Home render");
        return (
            <Switch>
                <Route exact path='/login' render={({ history }) => <Login history={history} handleLogin={this.handleLogIn} />} />
                <Route path='/' render={() => <App login={this.state.loggedIn} />} />
            </Switch>);
    }
}
export default Home;