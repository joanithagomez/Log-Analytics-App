import React, { Component } from "react";
import "./error-analysis.css";
import UploadFile from './UploadFile';
import Table from './Table';
import axios from 'axios';
import Graph from './Graph';
const feather = require('feather-icons')

class ErrorAnalysis extends Component {
    constructor(props) {
            super(props);
            this.state = {
                files: [],
                lines: [],
                dataLoaded: false,
                currentFile: '',
                // msg:'',
            };
           
            this.handleChange = this.handleChange.bind(this);
            this.handleDelete = this.handleDelete.bind(this);            
    
    }
    

    fetchFileData(value) {
        var url = '/file.php?name=' + encodeURIComponent(value)+ '&type=error';
        let lineArray = [];
        
        return axios.get(url).then((response) => {
            lineArray = response.data;            
            this.setState({
                lines: lineArray,
                dataLoaded: true,
                currentFile: value,
            });
        });

    }


    componentDidMount() {

        let filesArr;
        axios.get('/files.php').then((response) => {
            filesArr = response.data;

            this.setState({
                files: filesArr,
            });

            if (filesArr.length === 0) {
                console.log("Upload a File");
            } else {
                this.fetchFileData(filesArr[0].name);
                feather.replace();                
            }
            
        });

    }

    componentDidUpdate() {        
        feather.replace();
    }

    handleChange(changeEvent) {
        this.fetchFileData(changeEvent.target.value);
        this.setState({
            currentFile: changeEvent.target.value
        })
    }


    handleDelete(file, e) {
            const data = new FormData();      
            data.append( 'file', file );
            axios.post('/deleteFile.php', data).then((response) => {
                if (response.data) {
                    axios.get('/files.php').then((response) => {
                        let filesArr = response.data;

                        let prev_file = '';
                        console.log(prev_file);
                        if (filesArr.length !== 0) {
                            prev_file = this.state.files[filesArr.length - 1].name;
                            console.log("inside"+prev_file);
                            
                            this.fetchFileData(prev_file);
                        }    
                        this.setState({
                            files: filesArr,
                            currentFile: prev_file,
                        });
                        
                    });  
                    
                }
                else {
                    console.log( "Failed to delete" );
                }
            });
        }

       
        renderFiles(files) {
            let fileArray = [];
            for (var i = 0; i < files.length; i++) {
               
                fileArray.push(<li key={'rbtn' + i} className="rbtn"><input type="radio" value={files[i].name} checked={this.state.currentFile === files[i].name} onChange={this.handleChange} id={files[i].name} name="selector" /><label htmlFor={files[i].name}>{files[i].name}<button className="delete-button" onClick={this.handleDelete.bind(this, files[i].name)}>
                    <i className="delete" data-feather="trash"></i></button>   </label> </li>);            
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
                errorArray.push(<tr key={'tr' + key}>
                    <td>{key}</td>
                    <td>{map[key]}</td>
                    </tr>);
            }
            
            return errorArray;
        }
    
    
    
        getErrors(errors) {
            if (errors.length === 0 || errors.length === undefined) {
                return;
            }
            
            for (var i = 0; i < errors.length; i++){
                errors[i].time = (errors[i].time).substr(0,6);
                }
                
                var errorArray = [];
                var map = {AccessDeniedException: 0,RuntimeException:0,transport:0, WARN:0 };
                var currentDateMap = {};
               
                    currentDateMap = {date:errors[0].time, freqMap: map};
                
                for(i = 0; i < errors.length; i++){              
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
  
            return errorArray;
                    
        }
    
    
    
    renderErrors(errors) {
            var columnArray = [];            
            let errorArray = this.getErrors(errors);
            if (errorArray === undefined) {
                return;
            }
            for (var j = 0; j < errorArray.length;j++){
                columnArray.push(<tr key={'tr' + j}>
                    <td>{errorArray[j].date}</td>
                    <td>{errorArray[j].freqMap.AccessDeniedException}</td>
                    <td>{errorArray[j].freqMap.RuntimeException}</td>
                    <td>{errorArray[j].freqMap.transport}</td>
                    <td>{errorArray[j].freqMap.WARN}</td>
                    </tr>);
            }
        
        return columnArray;
    }
    


    graphData(errors) {
        let errorArray = this.getErrors(errors);
        if (errorArray === undefined) {
            return;
        }
        
        var arrayData = [['Date', 'Access Denied', 'Transport', 'WARN', 'Runtime Exception']];
       
        for (var j = 0; j < errorArray.length; j++) { 
            arrayData.push([errorArray[j].date, errorArray[j].freqMap.AccessDeniedException, errorArray[j].freqMap.RuntimeException, errorArray[j].freqMap.transport, errorArray[j].freqMap.WARN]);
        }

        return arrayData;
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
                   
                <div className=" col-12 sub-c">

                    <div className="col-2 left-container">
                            
                        <div className="file-subc">   
                            <div className="ubtn">        
                                <UploadFile onUpload={(filename) => {
                                    let filenameArr = [{ name: filename }];
                                    this.fetchFileData(filenameArr[0].name).then((response) => {
                                        if (this.state.lines.length === 0) {
                                            this.handleDelete(filename);
                                            
                                           console.log("Not a valid file. Upload failed.");
                                        } else {
                                            let newArray = this.state.files.concat(filenameArr);
                                            this.setState({
                                                files: newArray,
                                                currentFile: filename,
                                            });
                                        }
                                    });
                                        
                                   
                                 }} />    
                                </div> 
                             
                            
                                <div className="files-bar">
                                         
                                <nav className="file">
                                        <ul>       
                                            {this.renderFiles(this.state.files)}
                                        </ul>
                                </nav>
                            </div> 
                        </div>
                        {/* <p className="msg">{this.state.msg}</p> */}

                    </div>    
                    <div className="col-9 right-container">
                        <div className="heading-c">
                        <h1>Error Analysis</h1>
                    </div>        
                        <div className="graph-c">
                            {(this.state.dataLoaded)?
                                <Graph className="graph" dataset={this.graphData(this.state.lines)} />:
                                <p className = "error-text">No data received. Please upload a valid file.</p>
                            }    
                        </div>
                        
                        <div className="errors-list">
                            <Table className="table-c" tableHeader={this.label()} total={this.renderTotalErrors(this.state.lines)} byDate={this.renderErrors(this.state.lines)}/>
                        </div>

                    </div>


               
                    </div>     
                </div>    
            );
        }

    }

export default ErrorAnalysis;