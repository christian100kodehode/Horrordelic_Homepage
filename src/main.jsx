import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import { CookieManager } from "react-cookie-manager";

//  <CookieManager  

//            translations={{
//           title: "Youtube and Google Cookies 🍪",
//           message:
//           "We value your privacy, but Youtube/Google will go ahead with their cookies. Accept to save and play as normal.",
//           buttonText: "Accept Needed for video",
        
//       }} 
//   showManageButton={false}
//   enableFloatingButton={true}  
// cookieCategories={{
//     Analytics: true, // Show Analytics category
//     Social: false, // Hide Social category
//     Advertising: true, // Show Advertising category  
//   }}
//      initialPreferences={{Analytics: true,
//   Social: false,
//   Advertising:true}}

// onManage={(preferences) => {
//         if (preferences) {
//           console.log("Cookie preferences updated:", preferences);
//         }
//       }}
//       onAccept={() => {
//         console.log("User accepted all cookies");

//       }}
//       onDecline={() => {
//         console.log("User declined all cookies");
//          window.gtag?.("consent", "update", { analytics_storage: "denied" });
     
//       }}     
//       ></CookieManager>

{/* // createRoot(document.getElementById("root")).render( */}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     
      <CookieManager
      translations={{
          title: "Youtube and Google Cookies 🍪",
       message:
         "We value your privacy, but Youtube/Google will go ahead with their cookies. Accept to save and play as normal.",
          buttonText: "Accept Needed for video" }}
      cookieCategories={{
  Analytics: true, // Show Analytics category
    Social: true, // Show Social category
   Advertising: true, // Show Advertising category  
  }}
   initialPreferences={{Analytics: true,
 Social: true,
 Advertising:true}}
            displayType="modal"
      enableFloatingButton={false}
      showManageButton={false}
      onManage={(preferences) => {
         if (preferences) {
          console.log("Cookie preferences updated:", preferences)
      }
      }}
    >
          <BrowserRouter>
      <App />
    </BrowserRouter>
     </CookieManager>
  </React.StrictMode>
);
