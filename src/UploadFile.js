import React, { Component } from 'react';
import axios from 'axios';

class UploadFile extends Component{

    handleUpload(event) {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('submit', 'submitfile');
        let self = this;            
        axios.post('/upload.php', data).then((response) => {
            self.props.onUpload(response.data);
        });
    }

    render() {
        
        return (
            <div>
                <input type="file" name="file" onChange={(e) => this.handleUpload(e)} />
            </div>    
        );
    }
}

export default UploadFile;