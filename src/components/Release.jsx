// Importing images
import bandCampLogo from "../images/bc-logotype-color-128.png";
import spotifyLogo from "../images/spotifyLogo.png";
import youtubeLogo from "../images/youtubeLogo.png";

// Importing CSS
import styles from "./Release.module.css";

// importing packages/hooks/components
import { useState, useEffect, useRef } from "react";
import { HashLink } from "react-router-hash-link";
import axios from "axios";

const Release = () => {
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

  // TESTING

  const [openMenu, setOpenMenu] = useState(false);

  // Drop down menu - All years

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

  const today = new Date();
  const yearNow = today.getFullYear();

  const GenerateArrayOfYears = () => {
    let years = [];
    for (let i = yearNow; i >= 2012; i--) {
      years.push(i);
    }
    return years;
  };

  const [value, setValue] = useState(yearNow.toString());

  console.log(value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // TESTING

  return (
    <main className={styles.container}>
      <span className={styles.loadingScreen} id="Loading">
        {isLoading ? "Loading Releases" : null}
      </span>
      {/* TESTING */}
      <div className={styles.yearSelector}>
        <label>
          Select year
          <select value={value} onChange={handleChange}>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <p>{value}</p>
      </div>
      {/* {console.log(value)} */}

      {album
        .filter((e) => e.release_date.slice(-4) === value)
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

              {/* <div>
              <button onClick={() => toggleText(id)}>Toggle</button>
              {showText[id] ? <p>{artist}</p> : null}
            </div> */}

              {/* TESTING */}

              {/* Youtube Playlist */}
              <div className={styles.tracksContainer}>
                <div className={styles.musicPlayer}>
                  <div className={styles.youtubePlayer}>
                    {youtube_playlist_embed ? (
                      <iframe src={youtube_playlist_embed} title="Horrordelic music player" allowFullScreen></iframe>
                    ) : (
                      <span className={styles.youtubeEmbedBlocked}>
                        <a href={youtube_full_album} target="_blank" rel="noreferrer">
                          <img src={youtubeLogo}></img>
                        </a>
                      </span>
                    )}
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
                          <HashLink smooth to={"/release#" + album_name}>
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
                {/* Map through the tracklist and show all tracks */}
                {tracklist.map((e, i) => (
                  <p key={`${album_name}${i}`}>{e}</p>
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
