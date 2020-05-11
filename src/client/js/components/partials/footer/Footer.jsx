import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
        <footer className="footer">
            <div className="container py-4">
                <div className="col mx-auto text-center">
                    <p className="credits">
                        <strong>Authors:</strong><br className="mb-1"/>
                        Arkadiy Krava 
                        (<a target="_blank" rel="noopener noreferrer" id="github-link" href="https://github.com/akrava">akrava</a> 
                        )<br/>
                        Danya  
                        (<a target="_blank" rel="noopener noreferrer" id="github-link" href="https://github.com/danya-psch">danya-psch</a> 
                        )<br/>
                    </p>
                    <span className="text-monospace">All rights reserved, RNB (c) 2020</span>
                </div>
            </div>
        </footer>
    );
  }
}


export default Footer;