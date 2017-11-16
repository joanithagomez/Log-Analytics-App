import React, { Component } from "react";
import "./error-analysis.css";
import UploadFile from './UploadFile';
import Table from './Table';
import axios from 'axios';
import Graph from './Graph';


class UsageAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            lines: [],
            dataLoaded: false,            
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);            
        
    }

    fetchFileData(value) {
        var url = '/file.php?name=' + encodeURIComponent(value)+ '&type=usage';
        let lineArray = [];
        
        return axios.get(url).then((response) => {
            lineArray = response.data;
            
            this.setState({
                lines: lineArray,
                dataLoaded: true,                
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
            } else 
                this.fetchFileData(filesArr[0].name);
            
        });
       

    }


    handleChange(changeEvent) {
        this.fetchFileData(changeEvent.target.value);
    }


    handleDelete(e) {
            e.preventDefault();
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
                fileArray.push(<div key={'rbtn' + i}className="rbtn"><input type="radio" value={files[i].name} onChange={this.handleChange} id={files[i].name} name="selector" /><label htmlFor={files[i].name}>{files[i].name}<button className="delete" value={files[i].name} onClick={this.handleDelete} >Delete</button></label></div>);
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
                usageArray.push(<tr key={'tr' + key}>
                    <td>{key}</td>
                    <td>{map[key]}</td>
                    </tr>);
            }
            
            return usageArray;
        }
    
    
    getUsage(usage) {
    
        if (usage.length === 0 || usage.length === undefined) {
            return;
        }
        
        for (var i = 0; i < usage.length; i++){
            usage[i].time = (usage[i].time).substr(0,6);
            }
                
        var usageArray = [];
        var map = { DockerVolumeController: 0, ProvisionController: 0, BlueprintController: 0, DockerServerController: 0 };
        var currentDateMap = {};
               
        currentDateMap = { date: usage[0].time, freqMap: map };
                
        for ( i = 0; i < usage.length; i++) {
            if (currentDateMap.date === usage[i].time) {
                if (map[usage[i].type] === undefined)
                    map[usage[i].type] = 1;
                else
                    map[usage[i].type] = map[usage[i].type] + 1;
                    
                    
                currentDateMap.freqMap = map;
            }
            else {
                usageArray.push(currentDateMap);
                map = { DockerVolumeController: 0, ProvisionController: 0, BlueprintController: 0, DockerServerController: 0 };
                currentDateMap = { date: usage[i].time, freqMap: map };
                map[usage[i].type] = 1;
            }
                
        }
        usageArray.push(currentDateMap);

        return usageArray;
    }


    renderUsage(usage) { 
                var columnArray = [];            
                let usageArray = this.getUsage(usage);
                if (usageArray === undefined) {
                    return;
                }
                for (var j = 0; j < usageArray.length;j++){
                    columnArray.push(<tr key={'tr' + j}>
                        <td>{usageArray[j].date}</td>
                        <td>{usageArray[j].freqMap.DockerVolumeController}</td>
                        <td>{usageArray[j].freqMap.ProvisionController}</td>
                        <td>{usageArray[j].freqMap.BlueprintController}</td>
                        <td>{usageArray[j].freqMap.DockerServerController}</td>
                        </tr>);
                }
            
            return columnArray;
        }
    
    
        graphData(usage) {
            let usageArray = this.getUsage(usage);
            if (usageArray === undefined) {
                return;
            }      
            var arrayData = [['Date','DockerVolumeController', 'ProvisionController', 'BlueprintController', 'DockerServerController']];       
            for (var j = 0; j < usageArray.length; j++) {
                arrayData.push([usageArray[j].date, usageArray[j].freqMap.DockerVolumeController, usageArray[j].freqMap.ProvisionController, usageArray[j].freqMap.BlueprintController, usageArray[j].freqMap.DockerServerController]);
            }

            return arrayData;
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

                    <div className="col-12 file-container">
                    <div className="col-10 graph-c">
                    {(this.state.dataLoaded)?
                                <Graph className="graph" dataset={this.graphData(this.state.lines)} />:
                                <p>No data received</p>
                            } 
                    </div>
                    <div className = "col-2 file-subc">
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
    

                    <div className="row usage-list">
                        <Table className="table-c" tableHeader={this.label()} total={this.renderTotalUsage(this.state.lines)} byDate={this.renderUsage(this.state.lines)}/>
                    </div>
                </div>
            );
        }

    }

export default UsageAnalysis;