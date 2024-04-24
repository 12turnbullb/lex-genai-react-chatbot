import React, { Component } from "react";

class Home extends Component {
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

  render() {
    return (
      <div className="App">
        <footer className="section-footer border-top padding-y">
          <div className="container">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.loadChatBotScript(this.props.user)}
            >
              Start Chat
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
