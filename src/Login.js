import React, { Component } from "react";
import "./Login.css";
import axios from 'axios';
 

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formvalues: {},      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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
      this.props.onLogin(response.data);
    });

  }

  handleRegister(event) {
    const data = new FormData();
    data.append('Username', this.state.formvalues['Username']);
    data.append('Password', this.state.formvalues['Password']);
    
    axios.post('/register.php', data).then((response)=> {   
      console.log(response.data);
      if (response.data === 'empty') {
        
      }
    });
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
              <input className="username" type="text" name='Username' onChange={this.handleChange} autoComplete="on"/>
            </div>
            <div className="password-container">
              <div className="password-label">Password</div>
                <input className="password" type="password" name="Password" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className = "buttons">
            <div className="btn-c">
                <div className="btn" name="Login" type="submit" onClick={this.handleSignIn}>Sign In</div>
                <div className="btn" name="Register" type="submit" onClick={this.handleRegister}>Register</div>  
           
              </div>
            </div>  
          </div>
        </div>

      </div>
    );
  }
}

export default Login;