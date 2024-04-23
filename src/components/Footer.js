import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="App">
        <footer className="section-footer border-top padding-y">
          <div className="container">
            <p className="align-items-center">
              &copy; Copyright 2023 All rights reserved
            </p>
            {/*             <p>
              <a href="#">Terms and conditions</a>
            </p> */}
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
