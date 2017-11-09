import React, { Component } from "react";
import "./Header.css";
import Logout from './Logout';
import axios from 'axios';

class Header extends Component{
    constructor(props) {
        super(props);
       
        this.userName = this.userName.bind(this);
    }

    userName() {
        var self = this;
        var name = "";
        axios.get('/user.php').then((response) => {
            self.name = response.data;
        });
        return this.name;
    }
    render() {
        
        return(
            <div className="title-bar">
                <span className="logo"><p>LOGO</p></span>
                <div className="nav">
                    <p className="un">{this.userName()}</p>
                    <Logout className="logout" onLogout={this.props.onLogout}/>
                </div>    
            </div>
        );
    }
}

export default Header;
