import React, { Component } from "react";
import "./ErrorTable.css";
import PieChart from './PieChart';


class ErrorTable extends Component{
    
// =====================
    //          Trans   Fail
    // aug 18      22   2
    // aug 19       11  0
    // 
    
    // [{date: 11/22/19,
    //   errors: { type: , freq: ;}
    //  },
    // {
    //      date:11/23/19,
    //      errors:   {type: freq ;}
    // }]

    renderTotalErrors(errors) {
        let errorArray = [];
        var map = {};
        for (var i = 0; i < errors.length; i++) {
            if (map[errors[i].type] == undefined)
            map[errors[i].type] = 1;
             else
            map[errors[i].type] = map[errors[i].type] + 1;                
        }

        for(var key in map){
            errorArray.push(<tr>
                <td>{key}</td>
                <td>{map[key]}</td>
                </tr>);
        }
        
        return errorArray;
    }


    renderErrors(errors) {
    
        var columnArray = [];

        if (errors.length == 0)
            return;
        
        errors.forEach(function(element){
            element.time = (element.time).substr(0,6);
            });
            
            var errorArray = [];
            var map = {AccessDeniedException: 0,RuntimeException:0,transport:0, WARN:0 };
            var currentDateMap = {};
           
                currentDateMap = {date:errors[0].time, freqMap: map};
            
            for(var i = 0; i < errors.length; i++){              
                if(currentDateMap.date === errors[i].time){
                    if (map[errors[i].type] == undefined)
                            map[errors[i].type] = 1;
                    else
                            map[errors[i].type] = map[errors[i].type] + 1;    
                
                
                    currentDateMap.freqMap = map;
                }
                else {
                    errorArray.push(currentDateMap);
                    map = {AccessDeniedException: 0,RuntimeException:0,transport:0, WARN:0 };
                    currentDateMap = {date: errors[i].time, freqMap: map};  
                    map[errors[i].type] = 1;
            
                }
            
            }
            errorArray.push(currentDateMap);
        
        
            for (var i = 0; i < errorArray.length;i++){
                columnArray.push(<tr>
                    <td>{errorArray[i].date}</td>
                    <td>{errorArray[i].freqMap.AccessDeniedException}</td>
                    <td>{errorArray[i].freqMap.RuntimeException}</td>
                    <td>{errorArray[i].freqMap.transport}</td>
                    <td>{errorArray[i].freqMap.WARN}</td>
                    </tr>);
            }
            return columnArray;
                
  }
    
    

    render() {
        
        return (
            <div>
                 <PieChart/>

            <div className="error-table">
                <table className="t">
                    <tr>
                        <th>Type</th>
                        <th>Frequency</th>
                    </tr>
                        {this.renderTotalErrors(this.props.row)}
                      
                </table>
                </div>
                
                <div className="error-table">  
                <table className="t">
                    <tr>
                        <th>Date</th>
                        <th>Access Denied exception</th>
                        <th>Runtime exception</th>    
                        <th>Transport</th>
                        <th>WARN</th>
                    </tr> 
                    {this.renderErrors(this.props.row)}
                                
                </table>  
                    
                </div>

            </div>    
        );    
    }
}


export default ErrorTable;