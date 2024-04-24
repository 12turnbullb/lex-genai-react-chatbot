import React from "react";

function loadChatBotScript() {
  if (window.ChatBotUiLoader) return; // If already loaded, do nothing
  const script = document.createElement("script");
  script.src = "https://ddz1rykkqujp8.cloudfront.net/lex-web-ui-loader.min.js";
  script.async = true;
  script.onload = () => {
    var loaderOpts = {
      baseUrl: "https://ddz1rykkqujp8.cloudfront.net/",
      shouldLoadMinDeps: true,
    };
    var loader = new window.ChatBotUiLoader.IframeLoader(loaderOpts);
    var chatbotUiConfig = {
      /* Example of setting session attributes on parent page
            lex: {
              sessionAttributes: {
                userAgent: navigator.userAgent,
                QNAClientFilter: ''
              }
            }
            */
    };
    loader.load(chatbotUiConfig).catch(function (error) {
      console.error(error);
    });
  };
  document.body.appendChild(script);
}

function ChatBotComponent() {
  return (
    <div>
      <button onClick={loadChatBotScript}>Load ChatBot</button>
    </div>
  );
}

export default ChatBotComponent;
