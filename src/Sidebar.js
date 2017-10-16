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
            </div>
        );
    }
}
export default Sidebar;