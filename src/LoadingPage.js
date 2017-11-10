import React, { Component } from "react";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import './LoadingPage.css'

class LoadingPage extends Component {
   
      render() {
        return (
          <div className="loadpage">
            <Loading
                    show={this.props.show}
                    showSpinner={true}      
              color="blue"
          />
          </div>
    
        );
      }
}
export default LoadingPage;
