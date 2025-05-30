import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ReleaseDetail.module.css";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import YoutubePlayer from "./YoutubePlayer";

// Importing images
import bandCampLogo from "../images/bc-logotype-color-128.png";
import spotifyLogo from "../images/spotifyLogo.png";
import youtubeLogo from "../images/youtubeLogo.png";
import { BsFillFileMusicFill } from "react-icons/bs";
import { BsFillChatDotsFill } from "react-icons/bs";

const ReleaseDetail = () => {
  const { path } = useParams();

  const [artist, setArtist] = useState({ name: {} });

  // Imported from Release.jsx
  const today = new Date();
  const yearNow = today.getFullYear();
  const [isSelected, setIsSelected] = useState(yearNow.toString());
  const [showVideo, setShowVideo] = useState({ id: false });
  const [hasLoaded, setHasLoaded] = useState({ id: false });
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

  // State for loading Artist data
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const fetchData = () => {
    setIsLoading(true);
    setTimeout(
      async () => {
        const API_URL = `../artist-list.json`;
        const response = await axios.get(API_URL);
        setList(response.data);
        setIsLoading(false);
      }
      // 2000 - if wanting timeout
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get release data for artists releases and compilations
  const [album, setAlbum] = useState([]);
  const [isLoadingRelease, setIsLoadingRelease] = useState(false);

  const fetchDataRelease = () => {
    setIsLoadingRelease(true);
    setTimeout(
      async () => {
        const API_URL = `/release-list.json`;
        const response = await axios.get(API_URL);
        setAlbum(response.data);
        setIsLoadingRelease(false);
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
    fetchDataRelease();
  }, []);

  // TESTING
  function getLastWordCap({ credits, list }) {
    // Ensure credits is a string, fallback to empty string if undefined
    const text = credits || "";

    const firstNonEmptyLine =
      text.split("\n").find((line) => line.trim() !== "") || "" || "\n\n";
    const lastWord = firstNonEmptyLine.trim().split(" ").pop() || "";

    const lastWordCap = lastWord.charAt(0).toUpperCase() + lastWord.slice(1);

    return lastWordCap;
    // <Link to={`/Artist/${lastWordCap}`}>{lastWordCap}</Link>
  }

  // const newCredit = () => {
  //   return credits.split("\n").slice(2, 3, 4);
  // };

  // console.log(list);

  // Fetch dj mixes
  // const [mix, setMix] = useState([]);
  // const [isLoadingMix, setIsLoadingMix] = useState(false);

  // const fetchDjRelases = () => {
  //   setIsLoadingMix(true);
  //   setTimeout(
  //     async () => {
  //       const API_URL = `/dj-sets.json`;
  //       const response = await axios.get(API_URL);
  //       setMix(response.data);
  //       setIsLoadingMix(false);
  // Old version:
  // Get the URL and add the hash then scrollintoView on load
  // let a = new URL(window.location.href);
  // document.querySelector(a.hash).scrollIntoView();
  // console.log(a.hash);
  // }
  // 2000 - if wanting timeout
  //   );
  // };

  // useEffect(() => {
  //   fetchDjRelases();
  // }, []);

  const params = useParams();
  console.log(params);
  // Test for search through tracklist!!
  // let artistAppears = album.filter(function (e) {
  //   return e.credits.indexOf(name.split(" ")[0]) >= 0;
  // });
  // {

  // }
  // TEST
  return (
    <main className={styles.container}>
      {console.log("Release detail")}
      {/* Map release data abd filter each year selected by user */}
      {album
        .filter((e) => e.path === params.path)
        .map(
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
            flac,
            mp3,
            wav,
            path,
            credits,
            release_date,
            youtube_full_album,
          }) => {
            const lastWordCap = getLastWordCap({ credits });

            return (
              <article
                key={path}
                className={styles.releaseContainer}
                id={path}
                ref={
                  path === window.location.hash.slice(1) ? selectedRef : null
                }
              >
                {/* {console.log(filteredAlbum)} */}

                <div className={styles.releaseName}>
                  {/* <HashLink smooth to={"/release#" + path}> */}
                  {/* <Link to={`/Release/${path}`}> */}
                  <p className={styles.heading}>
                    &nbsp;{artist}:&nbsp;{album_name}
                    <span className={styles.headingLand}>{land}</span>
                  </p>

                  {list
                    .filter((e) =>
                      // e.release_text.includes(name.split(" ")[0])
                      //  ||
                      e.name
                        .toString()
                        .replace(/\s/g, "")
                        .toLowerCase()
                        .includes(lastWordCap.toLowerCase())
                    )
                    .map(({ nameNoSpace, name, al }) => {
                      return (
                        <div
                          className={styles.artistAppearing}
                          key={album_name}
                        >
                          <Link to={`/Artist/${nameNoSpace}`}>
                            {artist === "VA" ? "Compiled by: " : "Made by: "}
                            {name}
                          </Link>
                        </div>
                      );
                    })}
                </div>
                <div className={styles.tracksContainer}>
                  <div className={styles.musicPlayer}>
                    <div className={styles.youtubeContainer}>
                      <div className={styles.videoRatio}>
                        {!showVideo ||
                          (!hasLoaded[id] && (
                            <button
                              title="Youtube Video"
                              type="button"
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
                                  src={
                                    "https://img.youtube.com/vi/" +
                                    youtube_full_album.slice(-11) +
                                    "/hqdefault.jpg"
                                  }
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

                        {showVideo[id] && (
                          <YoutubePlayer
                            autoplay="0"
                            videoId={youtube_full_album.slice(-11)}
                          />
                        )}
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

                      <a
                        href={youtube_playlist_embed}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={youtubeLogo} alt="Youtube Link" />
                      </a>
                      {flac ? (
                        <a href={flac} target="_blank" rel="noreferrer">
                          <p>FLAC</p>
                        </a>
                      ) : (
                        ""
                      )}
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
                          <p
                            style={
                              !showText[id]
                                ? { display: "" }
                                : { display: "none" }
                            }
                            className={styles.releaseTextShort}
                          >
                            {release_text.substring(0, 550) + "...."}
                          </p>
                          <div
                            style={
                              !showText[id]
                                ? { display: "" }
                                : { display: "none" }
                            }
                          >
                            {/* <HashLink smooth to={"/release#" + album_name}> */}
                            <button
                              type="button"
                              onClick={() => toggleText(id)}
                              title="Read more about this release.."
                            >
                              Read More
                            </button>
                            {/* </HashLink> */}
                          </div>
                          {/* Show the readmore contents */}
                          {showText[id] && [
                            <div
                              key={{ id } + { album_name }}
                              id={album_name}
                              className={styles.readMoreContainer}
                            >
                              <div className={styles.readMoreText}>
                                <p>{release_text}</p>
                                <p>Credits:</p>
                                <p> {credits}</p>
                                <p>Release date:</p>
                                <p>{release_date}</p>
                              </div>
                              <HashLink smooth to={"#top"}>
                                <button onClick={() => toggleText(id)}>
                                  Read less
                                </button>
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
                    <p
                      key={`${album_name}${i}`}
                      style={
                        e.length > 40
                          ? { lineHeight: "1em" }
                          : { lineHeight: "0.5em" }
                      }
                    >
                      {e.length > 100 ? e.substring(0, 100) + "..." : e}
                    </p>
                  ))}
                </div>
              </article>
            );
          }
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
        <HashLink smooth to={"#top"}>
          Go to top of Page
        </HashLink>
      </h2>
    </main>
  );
};

export default ReleaseDetail;
