// imported css
import "./App.css";
// import "./index.css";
// Importing components
import Release from "./components/Release";
// import Release2022 from "./components/2022/Release2022";
import Navbar from "./components/Navbar";
import Artists from "./components/Artists";
import Main from "./components/Main";
import ReleaseAndEvents from "./components/ReleaseAndEvents";
import ArtistDetail from "./components/ArtistDetail";
import ReleaseDetail from "./components/ReleaseDetail";
import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Importing hooks/packages
import { Routes, Route, Link } from "react-router-dom";
// import { useLocalStorage } from "use-Local-Storage";

import { HelmetProvider } from "react-helmet-async";
import UseLocalStorage from "use-local-storage";

function App() {
  // change theme
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = UseLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  // console.log(theme);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // const backButtonState = "false";

  // const [backState, setBackState] = UseLocalStorage(
  //   "backState",
  //   backButtonState ? "false" : true
  // );

  // const switchButtonState = () => {
  //   const newState = backState === "false" ? "true" : "false";
  //   setBackState(newState);
  // };

  // console.log(backState);

  // function navigateManagamentBack() {
  //   const navigate = useNavigate();

  //   const goBack = () => {
  //     navigate(-1); // Navigates back one step in history
  //   };

  //   return (
  //     <button
  //       onClick={() => {
  //         goBack();
  //       }}
  //     >
  //       GoBack
  //     </button>
  //   );
  // }

  return (
    <HelmetProvider>
      <div className="App" data-theme={theme}>
        <Navbar />
        <div className="themeButtonContainer">
          {/* {navigateManagamentBack()} */}
          <button
            type="button"
            className="themeChangerButton"
            onClick={switchTheme}
            title="Change colors on site.."
          >
            {" "}
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          {/* <button onClick={switchButtonState}>
             {backState === "true" ? "" : navigateManagamentBack()}
          </button>
          */}
          {/* <button onClick={switchButtonState}>
            {backState === "false" ? "true" : "false"}
          </button> */}
        </div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Artists" element={<Artists />} />

          <Route path="/Release" element={<Release />} />
          {/* {/* <Route path="/Releases" element={<Release />} /> */}
          <Route path="/Release/:path" element={<ReleaseDetail />} />
          <Route path="/Artist/:id" element={<ArtistDetail />} />
          {/* <Route path="/Release/*" element={<Release />} />
          <Route path="/Releases/*" element={<Release />} /> */}
          {/* <Route path="Releases/*" element={<Release />} /> */}
          <Route path="/Artist/*" element={<Main />} />
          <Route path="/Release/test" element={<Main />} />

          {/* <Route path="Release/*" element={<Main />} /> */}
          <Route path="/*" element={<Main />} />
          {/* <Route path="/Release/*" element={<Release />} /> */}
          {/* <Route path="ReleaseAndEvents" element={<ReleaseAndEvents />} /> */}
          {/* <Route exact path="/*" element={<Main />} /> */}
          {/* <Route exact path="/Release/*" element={<Release />} /> */}
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;
