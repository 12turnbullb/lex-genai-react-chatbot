import React, { Component } from "react";
import { signOut, getCurrentUser } from "aws-amplify/auth";
import Content from "./Content";

class Header extends Component {
  state = {
    username: "",
  };

  // function to signout the user
  signOut = async () => {
    try {
      await signOut({ global: true });
      this.unloadChatBot();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  unloadChatBot() {
    // add piece in here to unload the chatbot so it doesn't show on login screen
    var chatbotDiv = document.getElementById("lex-web-ui-iframe");
    if (chatbotDiv) {
      chatbotDiv.remove();
    }
    // Remove the script tag
    var chatbotScript = document.querySelector(
      'script[src*="lex-web-ui-loader.min.js"]'
    );
    if (chatbotScript) {
      chatbotScript.remove();
    }
    // Reset the global chatbot variable
    window.ChatBotUiLoader = null;
  }

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
  componentDidMount() {
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
                    Sample Organization
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
        <div>
          <Content username={this.state.username} />
        </div>
      </div>
    );
  }
}

export default Header;
