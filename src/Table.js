import React, { Component } from "react";
import "./Table.css";

class Table extends Component{
    

    render() {
        
        return (
            <span>
            <table className="table">
                <tbody className="t" id="vol-table">
                    <tr>
                        <th>Type</th>
                        <th>Frequency</th>
                    </tr>
                    {this.props.total}
                      
                </tbody>
                </table>

                <table className="table">  
                <tbody className="t" id="date-table">
                    {this.props.tableHeader}
                    {this.props.byDate}                               
                </tbody>  
                    
                </table>

            </span>    
        );    
    }
}


export default Table;