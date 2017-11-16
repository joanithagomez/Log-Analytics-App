import React, { Component } from 'react';
import axios from 'axios';
import Modal from './Modal';

class UploadFile extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            isOpen: false,
            modalComp: ""
        };
    }
    
    // toggleModal = () => {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //       });
    // } 
    
    handleUpload(event) {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('submit', 'submitfile');
        let self = this;            
        axios.post('/upload.php', data).then((response) => {
            if (response.data === "File already exists. Your file was not uploaded.") {
                this.setState({
                    isOpen: !this.state.isOpen
                  });
            }
            else{
                self.props.onUpload(response.data);
            }
        });
    }

    render() {
        
        return (<span className="upload-c">
                <label className="upload-btn">Upload
                    <input type="file" name="file" onChange={(e) => this.handleUpload(e)} onClick={this.toggleModal} />
            </label>
            <Modal show={this.state.isOpen}
                onClose={() => {
                    this.setState({
                        isOpen: !this.state.isOpen
                    });
                }}>
          File already exists.Your file was not uploaded.
        </Modal>
            </span>
        );
    }
}

export default UploadFile;