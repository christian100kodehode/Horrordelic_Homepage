// imported css
import "./App.css";
// import "./index.css";
// Importing components
import Release from "./components/Release";
import Release2022 from "./components/2022/Release2022";
import Navbar from "./components/Navbar";
import Artists from "./components/Artists";
import Main from "./components/Main";
import { FaMoon, FaSun } from "react-icons/fa";
// Importing hooks/packages
import { Routes, Route, Link } from "react-router-dom";
import useLocalStorage from "use-Local-Storage";

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
    <div className="App" data-theme={theme}>
      <Navbar />
      <button type="button" className="themeChangerButton" onClick={switchTheme} title="Change colors on site..">
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="Artists" element={<Artists />} />
        <Route path="Release" element={<Release />} />
        <Route path="Release2022" element={<Release2022 />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
