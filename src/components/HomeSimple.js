import React, { Component } from "react";

class HomeSimple extends Component {
  render() {
    return (
      <div className="App">
        <footer className="section-footer border-top padding-y">
          <div className="container">
            <h1 className="align-items-center">This is a sample home page</h1>

            <div className="columns">
              <div className="column">
                <p>Sample Text 1</p>
                <p>Sample Text 2</p>
                <p>Sample Text 3</p>
              </div>
              <div className="column">
                <p>Sample Text 4</p>
                <p>Sample Text 5</p>
                <p>Sample Text 6</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default HomeSimple;
