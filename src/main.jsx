import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import { CookieManager } from "react-cookie-manager";

ReactDOM.createRoot(document.getElementById("root")).render(
/* ReactDOM.createRoot(document.getElementById("root")).render( */
  <React.StrictMode>
     <CookieManager  
/*      initialPreferences=  {{Analytics: false,
  Social: false,
  Advertising:true,}} */
           translations={{
          title: "Youtube and Google Cookies 🍪",
          message:
          "We value your privacy, but Youtube/Google will go ahead with their cookies. Accept to save and play as normal.",
          buttonText: "Accept All",
          declineButtonText: "Decline All",
      }} 
  showManageButton={false}
  enableFloatingButton={true}  
/*   cookieCategories={{
    Analytics: true, // Show Analytics category
    Social: true, // Hide Social category
    Advertising: true, // Show Advertising category  
  }} */


onManage={(preferences) => {
        if (preferences) {
          console.log("Cookie preferences updated:", preferences);
        }
      }}
      onAccept={() => {
        console.log("User accepted all cookies");

      }}
      onDecline={() => {
        console.log("User declined all cookies");
     
      }}      
      >
          <BrowserRouter>
      <App />
    </BrowserRouter>
     </CookieManager>
  </React.StrictMode>
);
