import React, { Component } from "react";
import imageSrc from "../sample_images/hero_image.jpeg";
import "../App.css";

class Content extends Component {
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
      <div className="main-page">
        <div className="hero">
          <img src={imageSrc} alt="Hero" className="hero-image" />
          <div className="content-container">
            <div className="content">
              <h1 className="header" style={{ color: "#186f99" }}>
                Welcome to Our Sample Organization
              </h1>
              <p className="subtitle">Discover a generative chat experience</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.loadChatBotScript(this.props.username)}
              >
                Launch Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
