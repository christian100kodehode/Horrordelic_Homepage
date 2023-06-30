import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { debounce } from "../utilities/helpers.js";
import { HashLink } from "react-router-hash-link";
import { AiOutlineArrowUp } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import  Logo  from "../images/HorrordelicLogo300x300.png"

const Navbar = () => {
  // Make the previous scroll state, start at 0.
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // make visiblie or !visible
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    // see current position (y)
    const currentScrollPos = window.pageYOffset;
    // set visible when preScroll is smaller than currentScroll aswell as prevscroll - currentstill is larger than 200 pixels. Last part is if the
    //  currentscrollPos if close to the top, it will appear (just scrolling a little bit up and down from the top)
    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 100) || currentScrollPos < 10);
    // timer for the r
    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    
    <nav className={styles.navbarlinks} style={{ top: visible ? "0" : "-65px" }}>
   <span className={styles.homeButton}>
      <Link to="/" title="Go back to main page">
        Main
      </Link>
      </span>
      <Link to="/Artists" title="Artist and Djs">
        Artists
      </Link>
      {/* Scroll to top when release page is not at top, else go to release page */}
      {prevScrollPos > 0 ? (
        <HashLink smooth to={"#"}>
          Releases
        </HashLink>
      ) : (
        <Link to="/release" title="All our Releases">
          Releases
        </Link>
      )}
      <Link to="/ReleaseAndEvents" title="Upcoming releases and Events" className={styles.upcomingLink}>
        Upcoming
      </Link>
     
      <div>
        <Link to="/" title="Horrordelic Records">
      <LazyLoadImage
          className={styles.Logo}
          src={Logo}
          // effect="blur"
          alt={Logo}
        /></Link>
        <HashLink smooth to={"#"}>
          <button className={styles.goToTopButton} title="Go to top of page..">
            <AiOutlineArrowUp />
          </button>
        </HashLink>
      </div>
    </nav>
  );
};

export default Navbar;
