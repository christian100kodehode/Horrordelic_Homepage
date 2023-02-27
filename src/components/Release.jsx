// Importing images
import bandCampLogo from "../images/bc-logotype-color-128.png";
import spotifyLogo from "../images/spotifyLogo.png";
import youtubeLogo from "../images/youtubeLogo.png";

// Importing CSS
import styles from "./Release.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";

// importing packages/hooks/components
import { useState, useEffect, useRef, useTransition, lazy, startTransition } from "react";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import YoutubePlayer from "./YoutubePlayer";

// const YoutubePlayer = lazy(() => import("./YoutubePlayer"));

const Release = () => {
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // State for Release data
  const [album, setAlbum] = useState([]);

  // useRef for window.location.hash URL
  const selectedRef = useRef(null);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(
      async () => {
        const API_URL = `./release-list.json`;
        const response = await axios.get(API_URL);
        setAlbum(response.data);
        setIsLoading(false);
        // Old version:
        // Get the URL and add the hash then scrollintoView on load
        // let a = new URL(window.location.href);
        // document.querySelector(a.hash).scrollIntoView();
        // console.log(a.hash);
      }
      // 2000 - if wanting timeout
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Scroll to element, when enter page from URL and #
  useEffect(() => {
    if (selectedRef.current) selectedRef.current.scrollIntoView();
  }, [selectedRef.current]);

  // Show text only on selected id
  const [showText, setShowText] = useState({});

  const toggleText = (id) => {
    setShowText((previousText) => {
      return {
        ...previousText,
        [id]: !previousText[id],
      };
    });
  };

  // TESTING

  // Menu

  const today = new Date();
  const yearNow = today.getFullYear();

  const [openMenu, setOpenMenu] = useState(false);
  const [isSelected, setIsSelected] = useState(yearNow.toString());

  const menuSelected = (value) => () => {
    setIsSelected(value);
    setOpenMenu(false);
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  // Drop down menu - All years

  const mobileOptions = ["2023", "2022", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012"];

  const [indexMenu, setindexMenu] = useState(0);

  // Go through the array, if at the end (length - 1 = end of array), stop. else + 1
  const handleindexMenu = () => {
    setindexMenu((value) => {
      setIsSelected(mobileOptions[value + 1]);
      if (value === mobileOptions.length - 1) {
        return value;
      } else {
        return value + 1;
      }
    });
  };

  // go through the array, if at start (location 0) stop, if larger than 0 go back one step at a time
  const handleindexMenuPositive = () => {
    setindexMenu((value) => {
      setIsSelected(mobileOptions[value - 1]);
      if (value === 0) {
        return value;
      } else {
        return value - 1;
      }
    });
  };

  const mobileYear = mobileOptions[indexMenu];
  // console.log(mobileYear);
  // console.log(isSelected);

  const options = [
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2020", value: "2020" },
    { label: "2019", value: "2019" },
    { label: "2018", value: "2018" },
    { label: "2017", value: "2017" },
    { label: "2016", value: "2016" },
    { label: "2015", value: "2015" },
    { label: "2014", value: "2014" },
    { label: "2013", value: "2013" },
    { label: "2012", value: "2012" },
  ];

  // Youtube states for preloading the videos
  const [, startTransistion] = useTransition();

  const [showVideo, setShowVideo] = useState({ id: false });
  const [hasLoaded, setHasLoaded] = useState({ id: false });

  const handleVideos = (id) => {
    setShowVideo((previousVideo) => {
      return {
        ...previousVideo,
        [id]: !previousVideo[id],
      };
    });
  };

  const handleHasLoaded = (id) => {
    setHasLoaded((previousVideo) => {
      return {
        ...previousVideo,
        [id]: !previousVideo[id],
      };
    });
  };

  return (
    <main className={styles.container}>
      {/* Optional Loading message */}
      {/* <span className={styles.loadingScreen} id="Loading">
        {isLoading ? "Loading Releases" : null}
      </span> */}

      <div onClick={toggleMenu} className={styles.yearSelector} style={isLoading ? { display: "none" } : { display: "" }}>
        <p>{!openMenu ? "Select Year of Release" : ""}</p>

        {openMenu &&
          options.map((option) => (
            <li key={option.value} onClick={menuSelected(option.value)}>
              {option.label}
            </li>
          ))}
        <p>{!openMenu ? "Selected : " + isSelected : ""}</p>
      </div>
      <div className={styles.mobileMenu}>
        <button style={indexMenu <= 0 ? { visibility: "hidden" } : { display: "" }} onClick={handleindexMenuPositive}>
          🡸
        </button>
        <p>{mobileOptions[indexMenu]}</p>
        <button style={indexMenu === mobileOptions.length - 1 ? { visibility: "hidden" } : { display: "" }} onClick={handleindexMenu}>
          🡺
        </button>
      </div>

      {/* SWIPER */}
      {/* <div className={styles.swiperContainer}>
        <SwiperMenu />
      </div> */}
      {/* SWIPER */}
      {/* {console.log(value)} */}

      {album
        .filter((e) => e.release_date.slice(-4) === isSelected)
        .map(
          (
            {
              artist,
              album_name,
              youtube_playlist_embed,
              land,
              id,
              tracklist,
              release_text,
              bandcamp,
              spotify,
              mp3,
              wav,
              path,
              credits,
              release_date,
              youtube_full_album,
            },
            filteredAlbum
          ) => (
            // console.log(filteredAlbum))
            <article key={path} className={styles.releaseContainer} id={path} ref={path === window.location.hash.slice(1) ? selectedRef : null}>
              <div className={styles.releaseName}>
                <HashLink smooth to={"/release#" + path}>
                  <p className={styles.heading}>
                    &nbsp;{artist}:&nbsp;{album_name}
                    <span>{land}</span>
                  </p>
                </HashLink>
              </div>

              {/* TESTING */}

              {/* TESTING */}
              <div className={styles.tracksContainer}>
                <div className={styles.musicPlayer}>
                  <div className={styles.youtubeContainer}>
                    <div className={styles.videoRatio}>
                      {!showVideo ||
                        (!hasLoaded[id] && (
                          <button
                            className={styles.thumbNailButton}
                            onClick={() => {
                              handleVideos(id);
                              handleHasLoaded(id);
                              startTransition(() => {
                                setShowVideo[id];
                              });
                            }}
                          >
                            <div className={styles.videoInner}>
                              <LazyLoadImage
                                className={styles.thumbNailImage}
                                src={"https://img.youtube.com/vi/" + youtube_full_album.slice(-11) + "/hqdefault.jpg"}
                                effect="blur"
                                alt={album_name}
                              />
                              <LazyLoadImage
                                alt="Play Video"
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg"
                                loading="lazy"
                                className={styles.playIcon}
                                effect="blur"
                              />
                            </div>
                          </button>
                        ))}

                      {showVideo[id] && <YoutubePlayer autoplay="0" videoId={youtube_full_album.slice(-11)} />}
                    </div>
                  </div>
                  {/* TESTING */}

                  {/* Youtube Playlist */}

                  {/* <div className={styles.youtubePlayer}>
                    {youtube_playlist_embed ? (
                      <iframe loading="lazy" src={youtube_playlist_embed} title="Horrordelic music player" allowFullScreen></iframe>
                    ) : (
                      <span className={styles.youtubeEmbedBlocked}>
                        <a href={youtube_full_album} target="_blank" rel="noreferrer">
                          <img src={youtubeLogo}></img>
                        </a>
                      </span>
                    )}
                  </div> */}

                  {/* Download Links - Stream Links */}

                  <div className={styles.downloadHeader}>
                    <p>Stream / Download</p>
                  </div>
                  <div className={styles.streamLinks}>
                    <a href={bandcamp} target="_blank" rel="noreferrer">
                      <img src={bandCampLogo} alt="Bandcamp Link" />
                    </a>
                    {spotify ? (
                      <a href={spotify} target="_blank" rel="noreferrer">
                        <img src={spotifyLogo} alt="Spotify Link" />
                      </a>
                    ) : (
                      ""
                    )}

                    <a href={youtube_playlist_embed} target="_blank" rel="noreferrer">
                      <img src={youtubeLogo} alt="Youtube Link" />
                    </a>
                    <a href={mp3} target="_blank" rel="noreferrer">
                      <p>MP3</p>
                    </a>
                    <a href={wav} target="_blank" rel="noreferrer">
                      <p>WAV</p>
                    </a>
                  </div>
                </div>

                {/* Album info */}
                <div className={styles.header}>
                  <div className={styles.break}></div>

                  <div className={styles.cssFix}>
                    {release_text.length ? (
                      // > 350
                      <div>
                        {/* Show and hide the text if more text is selected, also show and hide the
                          show more button to make it appear under the showing text */}
                        <p style={!showText[id] ? { display: "" } : { display: "none" }} className={styles.releaseTextShort}>
                          {release_text.substring(0, 550) + "...."}
                        </p>
                        <div style={!showText[id] ? { display: "" } : { display: "none" }}>
                          <HashLink smooth to={"/release#" + album_name}>
                            <button onClick={() => toggleText(id)}>Read More</button>
                          </HashLink>
                        </div>
                        {/* Show the readmore contents */}
                        {showText[id] && [
                          <div key={{ id } + { album_name }} id={album_name} className={styles.readMoreContainer}>
                            <div className={styles.readMoreText}>
                              <p>{release_text}</p>
                              <p>Credits:</p>
                              <p> {credits}</p>
                              <p>Release date:</p>
                              <p>{release_date}</p>
                            </div>
                            <HashLink smooth to={"/release#" + path}>
                              <button onClick={() => toggleText(id)}>Read less</button>
                            </HashLink>
                          </div>,
                        ]}
                      </div>
                    ) : (
                      release_text
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.trackList}>
                <p>Track list:</p>
                {/* Map through the tracklist and show all tracks , also check if names are longer than 50, then set extra line height. if longer line than 100, cut @ 100 else just write it normally. */}
                {tracklist.map((e, i) => (
                  <p key={`${album_name}${i}`} style={e.length > 50 ? { lineHeight: "1em" } : { lineHeight: "0.5em" }}>
                    {e.length > 100 ? e.substring(0, 100) + "..." : e}
                  </p>
                ))}
              </div>
            </article>
          )
        )}

      {/* {album.map(({ release_date, artist }) =>
        release_date.slice(-4) === value ? (
          <span>
            <p>{artist}</p>
          </span>
        ) : null
      )} */}
      {/* TESTING */}

      {/* OLD ---- 
      
      Map through releases array and destructure the array items wanted */}
      {/* {album.map(
        ({
          artist,
          album_name,
          youtube_playlist_embed,
          land,
          id,
          tracklist,
          release_text,
          bandcamp,
          spotify,
          mp3,
          wav,
          path,
          credits,
          release_date,
        }) => (
          <></>
        )
      )}  OLD END*/}

      <h2 style={isLoading ? { display: "none" } : { display: "" }}>
        <HashLink smooth to={"/release#top"}>
          Go to top of Page
        </HashLink>
      </h2>
    </main>
  );
};

export default Release;
