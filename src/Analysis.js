import React, { Component } from "react";
import "./error-analysis.css";
import UploadFile from './UploadFile';
import Table from './Table';
import axios from 'axios';
import Graph from './Graph';


class Analysis extends Component {
    constructor(props) {
        super(props);
        let filesArr;
        this.state = {
            files: [],
            lines: []
        };

        axios.get('/files.php').then((response) => {
            filesArr = response.data;
            this.setState({
                files: filesArr,
            });
        });

        this.handleChange = this.handleChange.bind(this);
    }

        handleChange(changeEvent) {
            var url = '/file.php?name=' + encodeURIComponent(changeEvent.target.value);
            let lineArray = [];

            axios.get(url).then((response) => {

                lineArray = response.data;
                // lineArray.forEach(function (element) {
                //     element.time = new Date(Date.parse('2017 ' + element.time));
                // });
              
                this.setState({
                    lines: lineArray
                });
            });


        }


        renderFiles(files) {
            let fileArray = [];
            var rbtnId = "";

            for (var i = 0; i < files.length; i++) {
                rbtnId = "r-btn" + i;
                fileArray.push(<label><input id={rbtnId} type="radio" name="file" value={files[i].name} onChange={this.handleChange} /> {files[i].name}</label>);
            }
            return fileArray;
        }


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
                        <Table total={this.renderTotalErrors(this.state.lines)} date={this.renderErrors(this.state.lines)}/>
                    </div>
                </div>
            );
        }

    }

export default ErrorAnalysis;