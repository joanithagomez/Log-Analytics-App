import React, { Component } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "tab1"
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
        console.log(e.target.className);
        this.setState({
            activeTab: e.target.className
        });
    }
    render(){

        return (
            <nav className="side-c">
                <ul className="tab">
                
                    <li><NavLink className="tab-link" to='/erroranalysis'  activeStyle={{background: '#f9f9f9', color: '#0F2541',borderTop: '3px solid rgb(232, 27, 51)'}}>
                    <i className="icon">
                    <svg width= "22px" height= "20px" viewBox="0 0 22 20" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                      
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g id="Page-1"strokeWidth="3" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <g id="bar-chart-2" transform="translate(1.000000, 1.000000)"  strokeWidth="3">
                                <rect id="Rectangle-path" x="8" y="0" width="4" height="18"></rect>
                                <rect id="Rectangle-path" x="16" y="5" width="4" height="13"></rect>
                                <rect id="Rectangle-path" x="0" y="10" width="4" height="8"></rect>
                            </g>
                        </g>
                    </svg>
                            </i>            
                    Error Analysis</NavLink></li>
                    
                    <li><NavLink className="tab-link" to='/usageanalysis'  activeStyle={{ background: '#f9f9f9', color: '#0F2541', borderTop: '3px solid rgb(232, 27, 51)'}}>
                        
                        <i className="icon">                       
                                <svg width= "22px" height= "20px" viewBox="0 0 26 24" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                <desc>Created with Sketch.</desc>
                                <defs></defs>
                                <g id="Page-1" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                    <g id="Manage-Files" transform="translate(-23.000000, -508.000000)" strokeWidth="3">
                                        <polyline id="Shape" points="46 520 42 520 39 529 33 511 30 520 26 520"></polyline>
                                    </g>
                                </g>
                                </svg>
                        </i>    
                        Usage Analysis</NavLink></li>
                </ul>
                
            </nav>
        );
    }
}
export default Sidebar;