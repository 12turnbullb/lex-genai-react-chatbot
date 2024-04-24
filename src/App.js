import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// function App() {
//   return <div className="App">
//   </div>;
// }

Amplify.configure(awsconfig);

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Footer />
      </>
    );
  }
}

// wrap your app in the default authenticator component
export default withAuthenticator(App);
