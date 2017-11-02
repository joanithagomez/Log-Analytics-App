import React, { Component } from "react";
import "./Dashboard.css";

class Dashboard extends Component{
    render() {
        return (
            <div className="dboard">Dashboard 
                <div className="grid">
                    <div className="block"><p>syslog.txt</p><p>Total errors: 120</p></div>
                    <div className="block"><p>syslog3.txt</p><p>Total errors: 220</p></div>
                    <div className="block"><p>syslog4.txt</p><p>Total errors: 10</p></div>
                </div>
            </div>
            
        );
    }
}

export default Dashboard;