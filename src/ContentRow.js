import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

class ContentRow extends Component {
    render(){
        return (
            <span>
                <Sidebar />
                <Content />
            </span>
            );
    }
}
export default ContentRow;