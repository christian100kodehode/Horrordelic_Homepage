import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import { CookieManager } from "react-cookie-manager";

ReactDOM.createRoot(document.getElementById("root")).render(
/* ReactDOM.createRoot(document.getElementById("root")).render( */
  <React.StrictMode>
     <CookieManager  
           translations={{
        title: "Youtube and Google Cookies 🍪",
        message:
          "We value your privacy, but Youtube/Google will go ahead with their cookies. Accept to save and play as normal.",
        buttonText: "Accept All",
        declineButtonText: "Decline All",
      }}
     showManageButton={false}
     enableFloatingButton={true}>
          <BrowserRouter>
      <App />
    </BrowserRouter>
     </CookieManager>
  </React.StrictMode>
);
