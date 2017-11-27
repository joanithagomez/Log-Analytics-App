import React, { Component } from "react";
import "./Login.css";
import axios from 'axios';
const feather = require('feather-icons')


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formvalues: {}, 
      loginErrorMsg: "",
      registerErrorMsg:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount() {
    feather.replace();
  }
  handleChange(event) {
    event.preventDefault();
    let formvalues = this.state.formvalues;
    let name = event.target.name;
    let value = event.target.value;
    formvalues[name] = value;
  
    this.setState({
      formvalues,
    });
  }

  handleSignIn(event) {
    const data = new FormData();
    data.append('Username', this.state.formvalues['Username']);
    data.append('Password', this.state.formvalues['Password']);
    axios.post('/login.php', data).then((response) => {
      if(response.data)
        this.props.onLogin(response.data);
      else {
        this.setState({
          loginErrorMsg: "Incorrect Username or password."
        });
      }
    });

  }

  handleRegister(event) {
    const data = new FormData();
    data.append('Username', this.state.formvalues['Username']);
    data.append('Password', this.state.formvalues['Password']);
    
    axios.post('/register.php', data).then((response) => {
      console.log(response.data);
      if (response.data === 'Fields empty.' ){
        this.setState(
          {
            registerErrorMsg: response.data + " Registration Failed."
          }
        );
      } else if (response.data === 'User already exists.') {
        this.setState(
          {
            registerErrorMsg: response.data + " Registration Failed."
          }
        );
      }
    });
  }


  render() {
   
    return (
      <div className="col-12 App">
        <header className="App-header">
          <h1 className="App-title">Log App</h1>
        </header>
        <div className="label">
          <div className="col-6 log-in">Register</div>
          <div className="col-6 log-in">Login</div>  
        </div>


        <div className="signin-container">

          <div className="col-6 register-container">
            <div className="login-box">
              <div className="icon-box">
                  <div>
                  <i className="icon" data-feather="user-plus"></i> 
                  </div>
                </div>
              
              <div className="form">
                <div className="fc">  
                <p className="error-msg">{this.state.registerErrorMsg}</p>  
  
                <div className="username-container">
                
                  <div className="username-label">Username</div>
                  <input className="username" type="text" name='Username' onChange={this.handleChange} autoComplete="on"/>
                </div>
                <div className="password-container">
                  <div className="password-label">Password</div>
                    <input className="password" type="password" name="Password" onChange={this.handleChange.bind(this)}/>
                </div>
                <div className = "buttons">
                <div className="btn-c">
                    
                    <div className="signup btn" name="Register" type="submit" onClick={this.handleRegister}>Sign Up</div>  
              
                  </div>
                </div>  
                </div>
              </div>  
            </div>    
          </div>  

        <div className="col-6 login-container">
            <div className="login-box">
             <div>
              <i className="icon" data-feather="users"></i> 
              </div> 

              <div className="form">
                <div className="fc">   
                  <p className="error-msg">{this.state.loginErrorMsg}</p>  
  
                  <div className="username-container">
                    <div className="username-label">Username</div>
                    <input className="username" type="text" name='Username' onChange={this.handleChange} autoComplete="on"/>
                  </div>
                  <div className="password-container">
                    <div className="password-label">Password</div>
                      <input className="password" type="password" name="Password" onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className = "buttons">
                  <div className="btn-c">
                      <div className="signin btn" name="Login" type="submit" onClick={this.handleSignIn}>Sign In</div>
                          </div>
                  </div>    
                </div>
             </div>  
           </div>
          </div>
          
        </div>  
      </div>
    );
  }
}

export default Login;