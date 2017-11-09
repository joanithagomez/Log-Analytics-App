import React, { Component } from "react";
import "./error-analysis.css";
import UploadFile from './UploadFile';
import Table from './Table';
import axios from 'axios';
import Graph from './Graph';


class ErrorAnalysis extends Component {
    constructor(props) {
        super(props);
        let filesArr;
        this.state = {
            files: [],
            lines: []
        };

        axios.get('/files.php').then((response) => {
            filesArr = response.data;
            // console.log(response.data);
            this.setState({
                files: filesArr,
            });
        });

        this.handleChange = this.handleChange.bind(this);
    }

        handleChange(changeEvent) {
            var url = '/file.php?name=' + encodeURIComponent(changeEvent.target.value)+ '&type=error';
            let lineArray = [];

            axios.get(url).then((response) => {
                console.log(response.data);
                lineArray = response.data;
                // lineArray.forEach(function (element) {
                //     element.time = new Date(Date.parse('2017 ' + element.time));
                // });
                // for (var i = 0; i < lineArray.length; i++){
                //     console.log(lineArray[i]);
                // }
              
                this.setState({
                    lines: lineArray
                });
            });


        }


        renderFiles(files) {
            let fileArray = [];

            for (var i = 0; i < files.length; i++) {
                fileArray.push(<label><input type="radio" name="file" value={files[i].name} onChange={this.handleChange} /> {files[i].name}</label>);
            }
            return fileArray;
        }


        renderTotalErrors(errors) {
            let errorArray = [];
            var map = {};
            for (var i = 0; i < errors.length; i++) {
                if (map[errors[i].type] === undefined)
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
    
            if (errors.length === 0 || errors.length == undefined)
                return;
            
            for (var i = 0; i < errors.length; i++){
                // console.log(errors[i]);
                errors[i].time = (errors[i].time).substr(0,6);
                };
                
                var errorArray = [];
                var map = {AccessDeniedException: 0,RuntimeException:0,transport:0, WARN:0 };
                var currentDateMap = {};
               
                    currentDateMap = {date:errors[0].time, freqMap: map};
                
                for(var i = 0; i < errors.length; i++){              
                    if(currentDateMap.date === errors[i].time){
                        if (map[errors[i].type] === undefined)
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
            
            
                for (var j = 0; j < errorArray.length;j++){
                    columnArray.push(<tr>
                        <td>{errorArray[j].date}</td>
                        <td>{errorArray[j].freqMap.AccessDeniedException}</td>
                        <td>{errorArray[j].freqMap.RuntimeException}</td>
                        <td>{errorArray[j].freqMap.transport}</td>
                        <td>{errorArray[j].freqMap.WARN}</td>
                        </tr>);
                }
                return columnArray;
                    
      }
    
        label() {
            return (
                <tr>
                <th>Date</th>
                <th>Access Denied exception</th>
                <th>Runtime exception</th>    
                <th>Transport</th>
                <th>WARN</th>
            </tr> 
            );
        }
        render() {
            return (
                <div className="container">
                    <div className="heading-c">
                        <h1>Error Analysis </h1>
                    </div>
                    <UploadFile onUpload={(filename) => {
                        let filenameArr = [{ name: filename }];
                        let newArray = this.state.files.concat(filenameArr);
                        this.setState({
                            files: newArray
                        })
                    }} />
                    <div className="fold-container">
                        <div className="graph-c">
                        <Graph/>
                        </div>
                        <form className="file-form">
                            {this.renderFiles(this.state.files)}
                        </form>
                    </div>
    

                    <div className="errors-list">
                        <p>Errors</p>
                        <Table tableHeader={this.label()} total={this.renderTotalErrors(this.state.lines)} byDate={this.renderErrors(this.state.lines)}/>
                    </div>
                </div>
            );
        }

    }

export default ErrorAnalysis;