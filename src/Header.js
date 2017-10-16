import React, { Component } from "react";
import "./Header.css";

class Header extends Component{
    render() {
        return(
            <div className="title-bar">
                <div className="logo">LOGO</div>
                <div className="nav">
                <p className="team">Team</p>
                <p className="colophon">Colophon</p>
                </div>    
            </div>
        );
    }
}

export default Header;
