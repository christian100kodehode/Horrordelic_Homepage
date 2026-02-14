// imported css
import "./App.css";

// Importing components
import Release from "./components/Release";
import Navbar from "./components/Navbar";
import Artists from "./components/Artists";
import Main from "./components/Main";
import ReleaseAndEvents from "./components/ReleaseAndEvents";
import ArtistDetail from "./components/ArtistDetail";
import ReleaseDetail from "./components/ReleaseDetail";
import { FaMoon, FaSun } from "react-icons/fa";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { Analytics } from "@vercel/analytics/react";


// Importing hooks/packages
import { Routes, Route } from "react-router";
// import { useLocalStorage } from "use-Local-Storage";

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

  return (
    <div className="App" data-theme={theme}>
      <Navbar />
      <div className="themeButtonContainer">
        <button
          type="button"
          className="themeChangerButton"
          onClick={switchTheme}
          title="Change colors on site.."
        >
          {" "}
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Main />} />

        <Route path="/" element={<SearchBar />} />
        <Route path="/search-results" element={<SearchResults />} />

        <Route path="/Release" element={<Release />} />
        <Route path="/Releases" element={<Release />} />
        <Route path="/Release/:path" element={<ReleaseDetail />} />

        <Route path="/Artists" element={<Artists />} />
        <Route path="/Artist/" element={<Artists />} />
        <Route path="/Artists/:id" element={<ArtistDetail />} />
        <Route path="/Artist/:id" element={<ArtistDetail />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;
