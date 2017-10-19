import React, { Component } from "react";
import "./Login.css";
import { Route } from "react-router-dom";
 import App from './App';
 import { Link } from "react-router-dom";
 import firebase from 'firebase';
 import firebaseApp from "./FirebaseApp";
 

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value,
      password: event.target.value
    });
  }

  handleClick(event) {
    console.log("Username: " + this.state.username);
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    
    // console.log(this.props.router.push("/dboard"));
    // this.props.history.push('/dboard');
    // <Link to='/dboard'> </Link>
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Log App</h1>
        </header>

        <div className="login-container">
          <div className="login-box">
            <p className="log-in">Login</p>

            <div className="username-container">
              <div className="username-label">Username</div>
              <input className="username" username={this.state.username}
              onChange={this.handleChange} type="text" autoComplete="on" />
            </div>
            <div className="password-container">
              <div className="password-label">Password</div>
              <input className="password" password={this.state.password}
              onChange={this.handleChange} type="text" autoComplete="on" />
            </div>
            <div className="btn-c">
              <div className="btn" onClick = {this.handleClick} >Sign in with Google</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;