import React, { Component } from "react";
import "./ErrorTable.css";
import PieChart from './PieChart';

class ErrorTable extends Component{
    constructor(props) {
        super(props);
        
      }  
    
    // [{"transport: 23"}]
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
        // errors.forEach(function(element){
        //     element.time = (element.time).substr(0,6);
        //   });
          
        //   var errorArray = [];
        //     var map = {};
        //     var currentDateMap = {date: errors[0].time, freqMap: map};
          
        //     for(var i = 0; i < errors.length; i++){              
        //       if(currentDateMap.date === errors[i].time){
        //           if (map[errors[i].type] == undefined)
        //                     map[errors[i].type] = 1;
        //           else
        //                     map[errors[i].type] = map[errors[i].type] + 1;    
                
              
        //             currentDateMap.freqMap = map;
        //       }
        //       else {
        //         errorArray.push(currentDateMap);
        //         map = {};
        //         currentDateMap = {date: errors[i].time, freqMap: map};  
        //         map[errors[i].type] = 1;
         
        //       }
            
        //   }
        //    errorArray.push(currentDateMap); 
                
  }

    

    render() {
        
        return (
            <div className="error-table">
                                  <PieChart/>

                <table class="t">
                    <tr>
                        <th>Type</th>
                        <th>Frequency</th>
                    </tr>
                        {this.renderTotalErrors(this.props.row)}
                      
                  </table>
                  
      {/* <table class="t">
                    <tr>
                        <th>Date</th>
                        <th>Access Denied</th>
                        <th>Transport</th>
                        <th>Runtime exception</th>
                        <th>WARN</th>
                    </tr>
                        {this.renderErrors(this.props.row)}
                  
       </table>  
                         */}
            </div>
        );    
    }
}


export default ErrorTable;