import React, { Component } from "react";
import { signOut, getCurrentUser } from "aws-amplify/auth";

class Header extends Component {
  state = {
    username: "",
  };

  // function to signout the user
  signOut = async () => {
    try {
      await signOut({ global: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  currentAuthenticatedUser = async () => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      this.setState({ username });
    } catch (err) {
      console.log(err);
    }
  };

  // Grab the current username from the cognito auth API before we render the page
  // set the state and use it to render the welcome label
  componentWillMount() {
    this.currentAuthenticatedUser();
  }

  render() {
    return (
      <div className="App">
        <header className="section-header">
          <section className="header-main border-bottom">
            <div className="container">
              <div className="row  align-items-center">
                <div className="col-lg">
                  <a href="/#" className="brand-wrap float-md-left">
                    Sample Web App
                  </a>
                </div>
                <div className="col-lg">
                  <div className="widgets-wrap float-md-right">
                    <div className="widget-header icontext">
                      <div className="text mx-3">
                        <span className="text-muted">
                          Welcome, {this.state.username}!
                        </span>
                      </div>
                      <a
                        href="/#"
                        onClick={this.signOut}
                        className="icon icon-sm rounded-circle border"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </header>
        <section className="section-pagetop bg">
          <div className="container">
            <h2 className="title-page" style={{ color: "#186f99" }}>
              Welcome to the Sample React App for Amazon Lex with Bedrock
            </h2>
          </div>
        </section>
      </div>
    );
  }
}

export default Header;
