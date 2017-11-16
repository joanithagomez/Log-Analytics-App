import React, { Component } from "react";
import "./Header.css";
import Logout from './Logout';
import axios from 'axios';
class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
           name: ""
       }
    }

    componentDidMount() {
        axios.get('/user.php').then((response) => {
            this.setState({
                name: response.data
            });
        });
        
    }
    
    render() {
        
        return(
            <div className="title-bar">
                <div className="logo">
                        <svg viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Group">
                    <path d="M11.5,0.00587008176 C11.6193277,0.00196651255 11.7391289,0 11.859375,0 C18.0121723,0 23,5.14872538 23,11.5 L17.9660794,11.5 C17.8710853,8.20529041 15.2538296,5.56451613 12.0390625,5.56451613 C11.8573501,5.56451613 11.6775467,5.57295339 11.5,5.5894691 L11.5,0.00587008176 Z" id="Combined-Shape" fill="#F5B00C"></path>
                    <path d="M11.5,23 C5.11442696,22.8040643 0,17.7303298 0,11.5 C0,5.26967019 5.11442696,0.195935682 11.5,-5.47305257e-16 L11.5,5.58645057 C8.27626249,5.86772952 5.75,8.49100492 5.75,11.6855786 C5.75,14.8801523 8.27626249,17.5034277 11.5,17.7847066 L11.5,23 Z" id="Combined-Shape" fill="#DC3146"></path>
                    <path d="M11.5,22.9941299 C11.6193277,22.9980335 11.7391289,23 11.859375,23 C18.0121723,23 23,17.8512746 23,11.5 L17.9660794,11.5 C17.9678556,11.5616037 17.96875,11.623436 17.96875,11.6854839 C17.96875,15.066001 15.3139385,17.8064516 12.0390625,17.8064516 C11.8573501,17.8064516 11.6775467,17.7980144 11.5,17.7814986 L11.5,22.9941299 Z" id="Combined-Shape" fill="#123F74"></path>
                </g>
            </g>
        </svg>

                </div>
                <div className="header-links">
                      
                    <p className="un">{this.state.name}</p>
                    <Logout className="logout" onLogout={this.props.onLogout}/>
                </div>    
            </div>
        );
    }
}

export default Header;
