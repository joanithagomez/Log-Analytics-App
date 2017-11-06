import React, { Component } from "react";
import "./UsageAnalysis.css";
import UploadFile from './UploadFile';
import Table from './Table';
import axios from 'axios';
import Graph from './Graph';


class UsageAnalysis extends Component {
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
            var url = '/file.php?name=' + encodeURIComponent(changeEvent.target.value) + '&type=usage';
            
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
            var rbtnId = ""; //set id's for radio buttons

            for (var i = 0; i < files.length; i++) {
                rbtnId = "r-btn" + i;
                fileArray.push(<label><input id={rbtnId} type="radio" name="file" value={files[i].name} onChange={this.handleChange} /> {files[i].name}</label>);
            }
            return fileArray;
        }


        renderTotalUsage(usage) {
            let usageArray = [];
            var map = {};
            for (var i = 0; i < usage.length; i++) {
                if (map[usage[i].type] === undefined)
                map[usage[i].type] = 1;
                else
                map[usage[i].type] = map[usage[i].type] + 1;                
            }
    
            for(var key in map){
                usageArray.push(<tr>
                    <td>{key}</td>
                    <td>{map[key]}</td>
                    </tr>);
            }
            
            return usageArray;
        }
    
    
        renderUsage(usage) {
        
            var columnArray = [];
    
            if (usage.length === 0)
                return;
            
                usage.forEach(function(element){
                element.time = (element.time).substr(0,6);
                });
                
                var usageArray = [];
                var map = {DockerVolumeController: 0,ProvisionController: 0,BlueprintController:0, DockerServerController: 0 };
                var currentDateMap = {};
               
                    currentDateMap = {date:usage[0].time, freqMap: map};
                
                for(var i = 0; i < usage.length; i++){              
                    if(currentDateMap.date === usage[i].time){
                        if (map[usage[i].type] === undefined)
                                map[usage[i].type] = 1;
                        else
                                map[usage[i].type] = map[usage[i].type] + 1;    
                    
                    
                        currentDateMap.freqMap = map;
                    }
                    else {
                        usageArray.push(currentDateMap);
                        map = {DockerVolumeController: 0,ProvisionController: 0,BlueprintController:0, DockerServerController: 0 };
                        currentDateMap = {date: usage[i].time, freqMap: map};  
                        map[usage[i].type] = 1;             
                    }
                
                }
                usageArray.push(currentDateMap);
            
            
                for (var j = 0; j < usageArray.length;j++){
                    columnArray.push(<tr>
                        <td>{usageArray[j].date}</td>
                        <td>{usageArray[j].freqMap.DockerVolumeController}</td>
                        <td>{usageArray[j].freqMap.ProvisionController}</td>
                        <td>{usageArray[j].freqMap.BlueprintController}</td>
                        <td>{usageArray[j].freqMap.DockerServerController}</td>
                        </tr>);
                }
                return columnArray;
                    
        }
    
    
        label() {
            return (
                <tr>
                <th>Date</th>
                <th>DockerVolumeController</th>
                <th>ProvisionController</th>    
                <th>BlueprintController</th>
                <th>DockerServerController</th>
            </tr> 
            );
        }
    

        render() {
            return (
                <div className="container">
                    <div className="heading-c">
                        <h1>Usage Analysis </h1>
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
    

                    <div className="usage-list">
                        <p>Usage</p>
                        <Table tableHeader={this.label()} total={this.renderTotalUsage(this.state.lines)} byDate={this.renderUsage(this.state.lines)}/>
                    </div>
                </div>
            );
        }

    }

export default UsageAnalysis;