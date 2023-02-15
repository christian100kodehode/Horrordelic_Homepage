// Importing images
import bandCampLogo from "../../images/bc-logotype-color-128.png";
import spotifyLogo from "../../images/spotifyLogo.png";
import youtubeLogo from "../../images/youtubeLogo.png";

// Importing CSS
import styles from "../Release.module.css";

// importing packages/hooks/components
import { useState, useEffect, useRef } from "react";
import { HashLink } from "react-router-hash-link";
import axios from "axios";

const Release2022 = () => {
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // State for Release data
  const [album, setAlbum] = useState([]);

  // useRef for window.location.hash URL
  const selectedRef = useRef(null);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const API_URL = `./release-list.json`;
      const response = await axios.get(API_URL);
      setAlbum(response.data);
      setIsLoading(false);
      // Old version:
      // Get the URL and add the hash then scrollintoView on load
      // let a = new URL(window.location.href);
      // document.querySelector(a.hash).scrollIntoView();
      // console.log(a.hash);
    }, 2000);
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
    setShowText((prevText) => ({
      ...prevText,
      [id]: !prevText[id],
    }));
  };

  return (
    <main className={styles.container}>
      <span className={styles.loadingScreen} id="Loading">
        {isLoading ? "Loading Releases" : null}
      </span>

      {/* Map through releases array and destructure the array items wanted */}
      {album.map(
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
          <article key={path} className={styles.releaseContainer} id={path} ref={path === window.location.hash.slice(1) ? selectedRef : null}>
            <div className={styles.releaseName}>
              <HashLink smooth to={"/release2022#" + path}>
                <p className={styles.heading}>
                  &nbsp;{artist}:&nbsp;{album_name}
                  <span>{land}</span>
                </p>
              </HashLink>
            </div>

            {/* TESTING */}

            {/* <div>
              <button onClick={() => toggleText(id)}>Toggle</button>
              {showText[id] ? <p>{artist}</p> : null}
            </div> */}

            {/* TESTING */}

            {/* Youtube Playlist */}
            <div className={styles.tracksContainer}>
              <div className={styles.musicPlayer}>
                <div className={styles.youtubePlayer}>
                  <iframe src={youtube_playlist_embed} title="Horrordelic music player" allowFullScreen></iframe>
                </div>

                {/* Download Links - Stream Links */}

                <div className={styles.downloadHeader}>
                  <p>Stream / Download</p>
                </div>
                <div className={styles.streamLinks}>
                  <a href={bandcamp} target="_blank" rel="noreferrer">
                    <img src={bandCampLogo} alt="Bandcamp Link" />
                  </a>
                  <a href={spotify} target="_blank" rel="noreferrer">
                    <img src={spotifyLogo} alt="Spotify Link" />
                  </a>
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
                        <HashLink smooth to={"/release2022#" + album_name}>
                          <button onClick={() => toggleText(id)}>Read More</button>
                        </HashLink>
                      </div>
                      {showText[id] && [
                        <div key={{ id } + { album_name }}>
                          <div className={styles.readMoreText} id={album_name}>
                            <p>{release_text}</p>
                            <p>Credits:</p>
                            <p> {credits}</p>
                            <p>Release date:</p>
                            <p>{release_date}</p>
                          </div>
                          <HashLink smooth to={"/release2022#" + path}>
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
              {/* Map through the tracklist and show all tracks */}
              {tracklist.map((e, i) => (
                <p key={`${album_name}${i}`}>{e}</p>
              ))}
            </div>
          </article>
        )
      )}
      <h2 style={isLoading ? { display: "none" } : { display: "" }}>
        <HashLink smooth to={"/release2022#top"}>
          Go to top of Page
        </HashLink>
      </h2>
    </main>
  );
};

export default Release2022;
