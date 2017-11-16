import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

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
            <div className="side-c">
                <ul className="tab">
                    
                    <li onClick={this.handleClick}><Link className="tab-link" to='/'>
                        <i className="icon">

                        <svg width= "22px" height= "20px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
                           
                            <desc>Created with Sketch.</desc>
                            <defs></defs>
                            <g id="Page-1" strokeWidth="3" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                <g id="pie-chart" transform="translate(0.000000, 1.000000)" strokeWidth="3">
                                    <path d="M20.21,13.89 C18.4598492,18.028883 14.1638237,20.4920434 9.70777262,19.9115357 C5.25172156,19.3310281 1.73014276,15.8494369 1.09878707,11.4003055 C0.467431373,6.95117409 2.88137274,2.62730068 7,0.83" id="Shape"></path>
                                    <path d="M21,10 C21,7.3478351 19.9464316,4.80429597 18.0710678,2.92893219 C16.195704,1.0535684 13.6521649,2.22044605e-16 11,0 L11,10 L21,10 Z" id="Shape"></path>
                                </g>
                            </g>
                        </svg>
                    
                            
                        </i> Dashboard</Link></li>
                    <li ><Link className="tab-link" to='/erroranalysis'>
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
                    Error Analysis</Link></li>
                    
                    <li ><Link className="tab-link"to='/usageanalysis'>
                        
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
                        Usage Analysis</Link></li>
                </ul>
                
            </div>
        );
    }
}
export default Sidebar;