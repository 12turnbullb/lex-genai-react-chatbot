import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer";
import HomeSimple from "./components/HomeSimple";

// function App() {
//   return <div className="App">
//   </div>;
// }

class App extends Component {
  render() {
    return (
      <>
        <HomeSimple />
        <Footer />
      </>
    );
  }
}

export default App;
