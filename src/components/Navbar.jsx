import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbarlinks}>
      <Link to="/">Main</Link>
      <Link to="/Artists">Artists</Link>
      <Link to="/Release">Releases</Link>
    </nav>
  );
};

export default Navbar;
