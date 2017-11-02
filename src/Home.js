import React, { Component } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import {withRouter} from "react-router-dom";
import { Switch } from "react-router-dom";
import App from './App';
import firebase from 'firebase';
import firebaseApp from "./FirebaseApp";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        };

    }    

    componentDidMount() {
        var self = this;
        firebaseApp.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
            }
            // The signed-in user info.
            var user = result.user;
            console.log("Logged in User: ", user.displayName);    
            
            self.setState({
                loggedIn: true,
            }, function () {
                self.props.history.push("/");
            }
            );
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
              
          });
    }

    render() {
        return (
            <Switch>
                <Route path='/' render={() => <App login={this.state.loggedIn} />} />
            </Switch>);
    }
}
export default withRouter(Home);