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
            this.setState({
                files: filesArr,
            });
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        
    }

        handleChange(changeEvent) {
            var url = '/file.php?name=' + encodeURIComponent(changeEvent.target.value)+ '&type=error';
            let lineArray = [];

            axios.get(url).then((response) => {
                lineArray = response.data;
                this.setState({
                    lines: lineArray
                });
            });


        }

        handleDelete(e) {
            e.preventDefault();
            console.log(e.target.value);
            const data = new FormData();      
            data.append( 'file', e.target.value );
            axios.post('/deleteFile.php', data).then((response) => {
                if (response.data) {
                    console.log("deleted");                    
                }
                else {
                    console.log("Failed to delete");
                }
            });
        }

       
        renderFiles(files) {
            let fileArray = [];
            for (var i = 0; i < files.length; i++) {
                fileArray.push(<div className="rbtn"><input type="radio" name="file" value={files[i].name} onChange={this.handleChange} id={files[i].name} name="selector" /><label for={files[i].name}>{files[i].name}</label><button className="delete" value={files[i].name} onClick={this.handleDelete} >Delete</button></div>);
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
                        <h1>Error Analysis</h1>
                    </div>

                    <div className="col-12 file-container">
                        <div className="col-10 graph-c">
                            <Graph className="graph"/>
                        </div>
                        
                        <div className="col-2 file-subc">
                            
                            <div className="files-bar">

                            <UploadFile onUpload={(filename) => {
                            let filenameArr = [{ name: filename }];
                            let newArray = this.state.files.concat(filenameArr);
                            this.setState({
                                files: newArray
                            })
                                }} />
                                
                            <div className="file">
                                        {this.renderFiles(this.state.files)}
                                </div>
                            </div> 
                        </div>    
                    </div>

                    <div className="row errors-list">
                        {/* {<p>Errors</p> */}
                        <Table className="table-c" tableHeader={this.label()} total={this.renderTotalErrors(this.state.lines)} byDate={this.renderErrors(this.state.lines)}/>
                    </div>
                </div>
            );
        }

    }

export default ErrorAnalysis;