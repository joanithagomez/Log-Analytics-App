import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
    render(){
        return (
            <div className="side-c">
                <ul>
                    <li><Link to='/dboard'>Dashboard</Link></li>
                    <li><Link to='/erroranalysis'>Error Analysis</Link></li>
                    <li><Link to='/usageanalysis'>Usage Analysis</Link></li>
                </ul>
                <div className="links">
                <ul>
                <li className="team">Team</li>
                <li className="colophon">Colophon</li>
                </ul>    
                </div>    
            </div>
        );
    }
}
export default Sidebar;