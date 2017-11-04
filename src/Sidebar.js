import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
    render(){
        return (
            <div className="side-c">
                <ul className="nav">
                    <li className="nav-item"><Link to='/dboard'>Dashboard</Link></li>
                    <li className="nav-item"><Link to='/erroranalysis'>Error Analysis</Link></li>
                    <li className="nav-item"><Link to='/usageanalysis'>Usage Analysis</Link></li>
                </ul>
                
            </div>
        );
    }
}
export default Sidebar;