// imported css
import "./App.css";
// import "./index.css";
// Importing components
import Release from "./components/Release";
import Release2022 from "./components/2022/Release2022";
import Navbar from "./components/Navbar";
import Artists from "./components/Artists";
import Main from "./components/Main";
import ReleaseAndEvents from "./components/ReleaseAndEvents";
import ArtistDetail from "./components/ArtistDetail";
import { FaMoon, FaSun } from "react-icons/fa";

// Importing hooks/packages
import { Routes, Route, Link } from "react-router-dom";
import useLocalStorage from "use-Local-Storage";
import { HelmetProvider } from "react-helmet-async";

function App() {
  // change theme
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light");

  console.log(theme);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <HelmetProvider>
      <div className="App" data-theme={theme}>
        <Navbar />
        <button type="button" className="themeChangerButton" onClick={switchTheme} title="Change colors on site..">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="Artists" element={<Artists />} />
          <Route exact path="Release" element={<Release />} />
          <Route exact path="ReleaseAndEvents" element={<ReleaseAndEvents />} />
          {/* <Route path="Release2022" element={<Release2022 />} /> */}
          <Route path="/artist/:id" element={<ArtistDetail />} />
          <Route exact path="*" element={<Main />} />
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;
