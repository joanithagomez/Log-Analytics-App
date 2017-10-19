import React, { Component } from "react";
import "./error-analysis.css";

class ErrorAnalysis extends Component{

    render() {
//         let files = [
//             { name: "syslog4.log", id: 1 }
//             { name: "syslog.log", id: 2 }
//         ];

//         $.ajax("/files.json").done(function (data) {
// //            { name: "syslog4.log", id: 1 }
// //            { name: "syslog.log", id: 2 }
//             this.setState({
//                 files: data
//             })            
//         });

        return (
            <div className="container">
                <div className="heading-c">
                    <h1>Error Analysis </h1>
                </div>
                <div className="graph-c">
                    Graph
                </div>
            </div>    
        );
    }
}

export default ErrorAnalysis;