import React, { Component } from "react";
import "./Header.css";

class Header extends Component{
    render() {
        return(
            <div className="title-bar">
                <div className="logo">LOGO</div>
                <div className="nav">
                    
                    <div>Joanitha Gomez</div>
                </div>    
            </div>
        );
    }
}

export default Header;
