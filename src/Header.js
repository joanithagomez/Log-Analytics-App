import React, { Component } from "react";
import "./Header.css";

class Header extends Component{
    render() {
        return(
            <div className="title-bar">
                <span className="logo"><p>LOGO</p></span>
                <div className="nav">
                    <p className="un">Joanitha Gomez</p>
                </div>    
            </div>
        );
    }
}

export default Header;
