import React, { Component } from "react";
import "./ErrorTable.css";


class ErrorTable extends Component{
    constructor(props) {
        super(props);
        
      }  
    
    // [{type: , freq: }]
// =====================
    //          Trans   Fail
    // aug 18      22   2
    // aug 19       11  0
    // 
    
    // [{
    //      date:
    //        {
    //          type: , freq: ;
    //        }
    //  },
    // {
    //      date:
    //        {
    //          type: freq ;
    //        }
    // }]

    renderErrors(errors) {
        let errorArray = [];
        // var dateMap = {};
        // var map = {};         

        // for (var i = 0; i < errors.length; i++) {
        //     var currentDate = errors[i].time;
        //     if (dateMap[currentDate] == undefined) {
        //          dateMap = {};
        //          map = {};
        //          dateMap[currentDate] = map;
        //          console.log("Adding new date map: " + dateMap);
        //     }
        //     else {
        //         map = dateMap[currentDate]; 
        //         if (map[errors[i].type] == undefined)
        //             map[errors[i].type] = 1;
        //          else
        //             map[errors[i].type] = map[errors[i].type] + 1;              
        //         console.log("Updating old date map: " + dateMap);
        //         dateMap[currentDate] = map;
                    
        //     }
        // }

        //     function innerMap(dm) {
        //         var array = [];
        //         console.log("dm: "+ dm);
        //         for (var innerkey in dm[key]) {
        //             console.log("key : " + innerkey + "freq : " + dm[key][innerkey]);
        //             array.push(<span><td>{innerkey}</td>
        //                 <td>{dm[key][innerkey]}</td>
        //                 </span>);
        //         }             
        //         return array;
        //     }

        // for (var key in dateMap) {
        //     console.log("date: " + key + "value : " + dateMap[key]);                errorArray.push(
        //         <tr>
        //             <td>{key}</td>
        //             {innerMap(dateMap[key])}
        //         </tr>
        //     );
        // }

        var map = {};         
        for (var i = 0; i < errors.length; i++) {
            if (map[errors[i].type] == undefined)
                   map[errors[i].type] = 1;
            else
                   map[errors[i].type] = map[errors[i].type] + 1;              
        }
        for (var key in map) {
                 errorArray.push(
                    <tr>
                        <td>{key}</td>
                        <td>{map[key]}</td>
                    </tr>
                );
            }
  
        return errorArray;
    }

    

    render() {
        
        return (
            <div className="error-table">
                <table id="t">
                    <tr>
                        {/* <th>Date</th> */}
                        <th>Type</th>
                        <th>Frequency</th>
                    </tr>
                    {/* <span> */}
                        {this.renderErrors(this.props.row)}
                    {/* </span>     */}
                  
                </table>
                        
            </div>
        );    
    }
}


export default ErrorTable;