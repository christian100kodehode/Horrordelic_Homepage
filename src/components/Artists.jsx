import React from "react";
import styles from "./Artists.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HashLink } from "react-router-hash-link";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiSoundcloudFill } from "react-icons/ri";

const Artists = () => {
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // State for Release data
  const [artist, setArtist] = useState([]);
  //state for dropDownMenu

  const [hover, setHover] = useState(false);
  const closeMenu = () => setClick(false);

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  const handleHover = () => {
    setHover(!hover);
  };

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(
      async () => {
        const API_URL = `./artist-list.json`;
        const response = await axios.get(API_URL);
        setArtist(response.data);
        setIsLoading(false);
      }
      // 2000 - if wanting timeout
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sort the list alphabetically
  let sortedList = artist.sort((a, b) => a.name.localeCompare(b.name));
  console.log(sortedList);
  return (
    <main className={styles.container}>
      <div className={styles.artistList}>
        <div className={styles.categoryHeader}>
          {/* Hamburger Menu icon changing on click */}
          <div
            className={styles.hamburgerMenu}
            onClick={handleClick}
            // onMouseEnter={handleClick}
          >
            {click ? (
              <FaTimes size={30} style={{ color: "#ffffff" }} />
            ) : (
              <FaBars size={30} style={{ color: "#ffffff" }} />
            )}
          </div>
          {/* Hamburger Menu show contents or not */}
          <ul
            className={click ? styles["navMenuActive"] : styles["navMenu"]}
            onMouseLeave={handleClick}
            onDoubleClick={handleClick}
          >
            <h4>Artists:</h4>
            <li className={styles.navItems}>
              {sortedList

                .filter(
                  (e) =>
                    e.category.toLowerCase() === "artist" &&
                    e.active === "yes" &&
                    e.active != undefined
                )

                .map(({ name, id, flag, nameNoSpace, soundcloud }) => {
                  return (
                    <div key={id} className={styles.navItem}>
                      <Link
                        title={"Artist page for " + name + "!"}
                        to={`/Artist/${nameNoSpace}`}
                      >
                        <h2
                          className={styles.artistlistMenu}
                          style={
                            name.length >= 9
                              ? { fontSize: "0.9em" }
                              : { fontSize: "1em" }
                          }
                        >
                          {name.replace(/_+/g, " ") + " "}
                          <span
                          // className={styles.land}
                          >
                            {flag}
                          </span>
                        </h2>
                      </Link>
                      <span>
                        <a
                          href={soundcloud}
                          target="_blank"
                          rel="noreferrer"
                          title={name + "`s" + " " + "Soundcloud Link."}
                        >
                          <button>
                            <RiSoundcloudFill />
                          </button>
                        </a>
                      </span>
                    </div>
                  );
                })}
            </li>
            <h4>Dj`s:</h4>
            {sortedList
              .filter(
                (e) =>
                  e.category.toLowerCase() === "dj" &&
                  e.active === "yes" &&
                  e.active != undefined
              )
              .map(({ name, id, flag, nameNoSpace, soundcloud }) => {
                return (
                  <div key={id} className={styles.navItem}>
                    <Link
                      title={"Artist page for " + name + "!"}
                      to={`/Artist/${nameNoSpace}`}
                    >
                      <h2
                        className={styles.artistlistMenu}
                        style={
                          name.length >= 9
                            ? { fontSize: "0.9em" }
                            : { fontSize: "1em" }
                        }
                      >
                        {name.replace(/_+/g, " ") + " "}
                        <span
                        // className={styles.land}
                        >
                          {flag}
                        </span>
                      </h2>
                    </Link>
                    <span>
                      <a
                        href={soundcloud}
                        target="_blank"
                        rel="noreferrer"
                        title={name + "`s" + " " + "Soundcloud Link."}
                      >
                        <button>
                          <RiSoundcloudFill />
                        </button>
                      </a>
                    </span>
                  </div>
                );
              })}
          </ul>
          <h2>Artists</h2>

          <h3>
            Here you find Psychedelic artists who all have specialized and
            developed deep Psychedelic states, deep into the twisted world of
            Darkpsy and all its paths into our minds.
          </h3>
        </div>
        {sortedList
          .filter(
            (e) =>
              e.category.toLowerCase() === "artist" &&
              e.active === "yes" &&
              e.active != undefined
          )
          .map(({ name, id, flag, nameNoSpace }) => {
            return (
              <div key={id} className={styles.artistsContainer}>
                <Link to={`/Artist/${nameNoSpace}`}>
                  <LazyLoadImage
                    className={styles.thumbNailImage}
                    src={"/artists/" + name.replace(/ /g, "") + ".jpg"}
                    // height={"20vh"}
                    // width={"20vh"}
                    // alt={name}
                    title={name}
                    effect="blur"
                    placeholderSrc={"/artists/ArtistPlaceholder.jpg"}
                  />
                  <h2
                    className={styles.artistHeader}
                    style={
                      name.length >= 9
                        ? { fontSize: "1.2em" }
                        : { fontSize: "1.5em" }
                    }
                  >
                    {name.replace(/_+/g, " ")}
                  </h2>
                  <span className={styles.land}>{flag}</span>
                </Link>
              </div>
            );
          })}
      </div>

      <div className={styles.artistList}>
        <h2 className={styles.categoryHeader}>
          Support your local Darkpsy dealer...
        </h2>
        <div className={styles.categoryHeader}>
          <h2>Djs</h2>

          <h3>
            Here you find our Active Psychedelic explorers that got steady flow
            of power and energy for any event. Going deep and far into the
            Darkpsy world, try out a set or two from any of our djs:
          </h3>
        </div>

        {artist
          .filter(
            (e) =>
              e.category.toLowerCase() === "dj" &&
              e.active === "yes" &&
              e.active != undefined
          )
          .map(({ name, id, flag, nameNoSpace }) => {
            return (
              <div key={id} className={styles.artistsContainer}>
                <Link to={`/Artist/${nameNoSpace}`}>
                  <LazyLoadImage
                    className={styles.thumbNailImage}
                    // Remove space in name, picture have to have to have no spaces
                    src={"/artists/" + name.replace(/ /g, "") + ".jpg"}
                    // height={"40vh"}
                    // width={"40vh"}
                    alt={name}
                    title={name}
                    effect="blur"
                    placeholderSrc={"/artists/ArtistPlaceholder.jpg"}
                  />

                  <h2
                    className={styles.artistHeader}
                    style={
                      name.length >= 9
                        ? { fontSize: "1em" }
                        : { fontSize: "1.5em" }
                    }
                  >
                    {/* {console.log(name.length)} */}
                    {name.replace(/_+/g, " ")}
                  </h2>
                  <span className={styles.land}>{flag}</span>
                </Link>
              </div>
            );
          })}
      </div>

      <div className={styles.artistList}>
        {/* Show epcial series and such grouped together  */}

        <div className={styles.categoryHeader}>
          <h2>Specials:</h2>
          <h3>
            Here you find some of our special series and themed releases,
            grouped together:
          </h3>
        </div>
        {artist
          .filter(
            (e) =>
              e.category.toLowerCase() === "special" &&
              e.active === "yes" &&
              e.active != undefined
          )
          .map(({ name, id, nameNoSpace }) => {
            return (
              <div key={id} className={styles.artistsContainer}>
                <Link to={`/Artist/${nameNoSpace}`}>
                  <LazyLoadImage
                    className={styles.thumbNailImage}
                    // Remove space in name, picture have to have to have no spaces
                    src={"/artists/" + name.replace(/ /g, "") + ".jpg"}
                    // height={"40vh"}
                    // width={"40vh"}
                    alt={name}
                    title={name}
                    effect="blur"
                    placeholderSrc={"/artists/ArtistPlaceholder.jpg"}
                  />

                  <h2
                    className={styles.artistHeader}
                    style={
                      name.length >= 9
                        ? { fontSize: "1em" }
                        : { fontSize: "1.5em" }
                    }
                  >
                    {/* {console.log(name.length)} */}
                    {name.replace(/_+/g, " ")}
                  </h2>
                </Link>
              </div>
            );
          })}
      </div>
      <h2 className={styles.footerBackLink}>
        <HashLink smooth to={"#"}>
          Go to top of Page
        </HashLink>
      </h2>
    </main>
  );
};

export default Artists;
