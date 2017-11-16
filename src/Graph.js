import React, { Component } from "react";
import { Chart } from 'react-google-charts';

class Graph extends Component {
  

    render() {
     
        var d = this.props.dataset;
 

        if (this.props.dataset !== undefined) {
            return (
                <Chart
                    chartType="ColumnChart"
                    data={d}
                    options={{}}
                    graph_id="ColumnChart"
                    width="100%"
                    height="400px"
                    legend_toggle                
                />
            );
        } else {
            return <p> No data</p>
        }
     
        
    }
                      
    
}

export default Graph;