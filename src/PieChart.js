import React, { Component } from "react";
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

class PieChart extends Component{
    
    render() {
        return (
                    <Chart
                        chartType="PieChart"
                        data={[['Error Type', 'Percentage'], ['Error a', 40], ['Error b', 10], ['Error c', 20], ['Error d', 8], ['Error e', 12], ['Error f', 10]]}
                        options ={{}}
                        graph_id="PieChart"
                        width="100%"
                        height="500px"
                        legend_toggle
                    />   
        );
    }
}

export default PieChart;