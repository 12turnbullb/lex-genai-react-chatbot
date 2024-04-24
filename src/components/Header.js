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

  loadChatBotScript(new_user) {
    if (window.ChatBotUiLoader) return; // If already loaded, do nothing
    const script = document.createElement("script");
    script.src =
      "https://ddz1rykkqujp8.cloudfront.net/lex-web-ui-loader.min.js";
    script.async = true;
    script.onload = () => {
      var loaderOpts = {
        baseUrl: "https://ddz1rykkqujp8.cloudfront.net/",
        shouldLoadMinDeps: true,
      };
      var loader = new window.ChatBotUiLoader.IframeLoader(loaderOpts);
      var chatbotUiConfig = {
        /* Example of setting session attributes on parent page */
        lex: {
          sessionAttributes: {
            //userAgent: navigator.userAgent,
            //QNAClientFilter: ''
            initialEmail: new_user,
          },
        },
      };
      loader.load(chatbotUiConfig).catch(function (error) {
        console.error(error);
      });
    };
    document.body.appendChild(script);
  }

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
        <footer className="section-footer border-top padding-y">
          <div className="container">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.loadChatBotScript(this.state.username)}
            >
              Launch Chat
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

export default Header;
