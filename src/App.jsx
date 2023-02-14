// imported css
import "./App.css";
// Importing components
import Release from "./components/Release";
import Navbar from "./components/Navbar";
import Artists from "./components/Artists";
import Main from "./components/Main";
// Importing hooks/packages
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="Artists" element={<Artists />} />
        <Route path="Release" element={<Release />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
