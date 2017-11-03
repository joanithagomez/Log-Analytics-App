import React, { Component } from "react";
import "./error-analysis.css";
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

class ErrorAnalysis extends Component{
    
    render() {
        return (
            <div className="container">
                <div className="heading-c">
                    <h1>Error Analysis </h1>
                </div>
                <div className="graph-c">
                    <Chart
                        chartType="PieChart"
                        data={[['Error Type', 'Percentage'], ['Error a', 40], ['Error b', 10], ['Error c', 20], ['Error d', 8], ['Error e', 12], ['Error f', 10]]}
                        options ={{}}
                        graph_id="PieChart"
                        width="100%"
                        height="500px"
                        legend_toggle
                    />
                </div>
                    
            </div>    
        );
    }
}

export default ErrorAnalysis;