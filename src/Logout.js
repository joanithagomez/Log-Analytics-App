import React, { Component } from "react";
import axios from 'axios';

class Logout extends Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let self = this;
        axios.get('/logout.php').then((response) => {
            self.props.onLogout(response.data);
        }); 
    }
    render(){
        return( 
            <div className="signout" onClick={this.handleClick}><p>Logout</p></div>
        );
    }
}
export default Logout;