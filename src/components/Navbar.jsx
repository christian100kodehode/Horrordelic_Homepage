import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { debounce } from "../utilities/helpers.js";
import { HashLink } from "react-router-hash-link";
import { AiOutlineArrowUp } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Logo from "../images/HorrordelicLogo300x300.png";

const Navbar = () => {
  // Make the previous scroll state, start at 0.
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // make visiblie or !visible
  const [visible, setVisible] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = debounce(() => {
    // see current position (y)
    const currentScrollPos = window.pageYOffset;
    // set visible when preScroll is smaller than currentScroll aswell as prevscroll - currentstill is larger than 200 pixels. Last part is if the
    //  currentscrollPos if close to the top, it will appear (just scrolling a little bit up and down from the top)
    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 100) ||
        currentScrollPos < 10
    );
    // timer for the r
    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <nav
      className={styles.navbarlinks}
      style={{ display: !visible ? "none" : "" }}
    >
      <Link to="../" title="Horrordelic Records">
        <LazyLoadImage
          className={styles.Logo}
          src={Logo}
          // effect="blur"
          alt={Logo}
        />
      </Link>
      {prevScrollPos > 0 && window.location.href.slice(-1) === "s" ? (
        <HashLink smooth to={"#"}>
          Artists
        </HashLink>
      ) : (
        <Link to="../Artists" title="All our Artists and Dj`s">
          Artists
        </Link>
      )}

      {/* Scroll to top when release page is not at top, else go to release page */}
      {prevScrollPos > 100 && window.location.href.slice(-1) === "e" ? (
        <HashLink smooth to={"#"}>
          Releases
        </HashLink>
      ) : (
        <Link to="../Release" title="All our Releases">
          Releases
        </Link>
      )}
      <div
      // style={{ margin: "2em 0em" }}
      ></div>
      {/* <Link
        to="/ReleaseAndEvents"
        title="Upcoming releases and Events"
        className={styles.upcomingLink}
      >
        Upcoming
      </Link> */}

      <div>
        <button
          title="Go to top of the page"
          onClick={scrollToTop}
          className={styles.goToTopButton}
          style={{ display: window.scrollY  === 0 ? "none" : "" }}
        >
          {console.log(scrollY)}
          <AiOutlineArrowUp />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
