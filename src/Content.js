import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ErrorAnalysis from "./ErrorAnalysis";
import UsageAnalysis from "./UsageAnalysis";
import "./Content.css";

class Content extends Component{
    render(){
        return (
            <div className="content">
                <Switch>
                    <Route exact path='/' component={ErrorAnalysis} />          
                    <Route path='/erroranalysis' component={ErrorAnalysis} />
                    <Route path='/usageanalysis' component={UsageAnalysis} />
                </Switch>    
            </div>    
        );
    }
}

export default Content;