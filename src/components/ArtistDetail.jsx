import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ArtistDetail.module.css";
import { useParams } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HashLink } from "react-router-hash-link";

// Importing images
import bandCampLogo from "../images/bc-logotype-color-128.png";
import spotifyLogo from "../images/spotifyLogo.png";
import youtubeLogo from "../images/youtubeLogo.png";
import { RiSoundcloudFill } from "react-icons/ri";
import { RiFacebookCircleFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";

const ArtistDetail = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState({ name: {} });

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

  // Fetch dj mixes
  const [mix, setMix] = useState([]);
  const [isLoadingMix, setIsLoadingMix] = useState(false);

  const fetchDjRelases = () => {
    setIsLoadingMix(true);
    setTimeout(
      async () => {
        const API_URL = `/dj-sets.json`;
        const response = await axios.get(API_URL);
        setMix(response.data);
        setIsLoadingMix(false);
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
    fetchDjRelases();
  }, []);

  // console.log(mix);

  const params = useParams();
  // Test for search through tracklist!!
  // let artistAppears = album.filter(function (e) {
  //   return e.tracklist.indexOf(name.split(" ")[0]) >= 0;
  // });
  // {
  //   console.log(artistAppears);
  // }
  // TEST
  return (
    <main className={styles.container}>
      {/* <meta property="og:url" content="https://horrordelic.com/artists/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Artist page" />
      <meta
        property="og:description"
        content="Worldwide Psychedelic Movement - Darkpsy"
      />
      <meta
        property="og:image"
        content="https://horrordelic.com/FBwebmediaFront1080x600.png"
      /> */}
      <div className={styles.cssFix}>
        {list
          .filter((e) => e.nameNoSpace === params.id)
          .map(
            ({
              name,
              category,
              id,
              headerInfo,
              artists_text,
              soundcloud,
              facebook,
              instagram,
              nameNoSpace,
              location,
              land,
            }) => {
              return (
                <div key={id + name} className={styles.artistsContainer}>
                  <meta
                    property="og:url"
                    content={
                      "https://horrordelic.com/artists/" +
                      "/Artists/" +
                      nameNoSpace
                    }
                  />
                  <meta charSet="UTF-8" />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                  />
                  <meta
                    name="description"
                    content={"The page for" + " " + name}
                  />
                  <meta property="og:title" content={name} />
                  <meta
                    property="og:description"
                    content="Worldwide Psychedelic Movement - Darkpsy Life."
                  />
                  <meta
                    property="og:image"
                    content={
                      "https://horrordelic.com/artists/" + nameNoSpace + ".jpg"
                    }
                  />
                  <title>{name}</title>
                  <div
                    className={styles.imageContainer}
                    style={{
                      backgroundImage: `url('${
                        "/artists/" + nameNoSpace + "Banner" + ".jpg"
                      }')`,
                    }}
                  >
                    <div className={styles.box}></div>
                    <div className={styles.headerTopContainer}>
                      <LazyLoadImage
                        className={styles.headerImageTop}
                        src={"/artists/" + nameNoSpace + ".jpg"}
                        alt={name.replace(/ /g, " ")}
                        title={name.replace(/ /g, " ")}
                        effect="blur"
                        placeholderSrc={"/artists/ArtistPlaceholder.jpg"}
                      />
                      <div className={styles.artistLinkContainer}>
                        <div className={styles.artistLinks}>
                          {facebook ? (
                            <a
                              href={facebook}
                              target="_blank"
                              rel="noreferrer"
                              title={"Contact " + name + " " + "at Facebook"}
                            >
                              <button>
                                <RiFacebookCircleFill />
                              </button>
                            </a>
                          ) : (
                            ""
                          )}
                           {facebook ? (
                            <a
                              href={instagram}
                              target="_blank"
                              rel="noreferrer"
                              title={"Contact " + name + " " + "at Instagram"}
                            >
                              <button>
                                <RiInstagramFill />
                              </button>
                            </a>
                          ) : (
                            ""
                          )}
                          {soundcloud ? (
                            <a
                              href={soundcloud}
                              target="_blank"
                              rel="noreferrer"
                              title={"Soundcloud site for " + name + "!"}
                            >
                              <button>
                                <RiSoundcloudFill />
                              </button>
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.artistHeader}>
                    <h1>{name.replace(/_+/g, " ")}</h1>
                    <h2>
                      {headerInfo ? headerInfo.toLowerCase() + "," : ""}{" "}
                      {category.toUpperCase()}
                    </h2>
                  </div>
                  <div className={styles.locationContainer}>
                    <h3>Location: </h3>
                    <h2>
                      {location}, {land}
                    </h2>
                  </div>
                  <div className={styles.artistText}>
                    <p>{artists_text}</p>
                  </div>
                  <div className={styles.appearsOnSectionHeader}>
                    <h1>Appears on:</h1>
                  </div>
                  <div>
                    {/* Filter on first name before whitespace + show these compiled albums*/}
                    <div className={styles.appearsOnSectionContain}>
                      {album
                        .filter(
                          (e) =>
                            // e.release_text.includes(name.split(" ")[0])
                            //  ||
                            e.release_text
                              .toString()
                              .replace(/\s/g, "")
                              .toLowerCase()
                              .includes(nameNoSpace.toLowerCase()) ||
                            e.credits
                              .toString()
                              .replace(/\s/g, "")
                              .toLowerCase()
                              .includes(nameNoSpace.toLowerCase()) ||
                            e.tracklist
                              .toString()
                              .replace(/\s/g, "")
                              .toLowerCase()
                              .includes(nameNoSpace.toLowerCase())
                        )
                        .map(
                          ({
                            album_name,
                            youtube_full_album,
                            youtube_playlist_embed,
                            spotify,
                            bandcamp,
                            mp3,
                            wav,
                            flac,
                            artist,
                            path,
                          }) => {
                            return (
                              <div
                                className={
                                  artist.length + album_name.length <= 30
                                    ? styles["appearsOnSection"]
                                    : styles["appearsOnSectionLong"]
                                }
                                key={album_name}
                              >
                                <a
                                  href={
                                    "https://horrordelic.com/release/" + path
                                  }
                                  target="_self"
                                  // rel="noreferrer"
                                >
                                  <p className={styles.albumReleaseNameStream}>
                                    {artist}: {album_name}
                                  </p>
                                  <div
                                    className={
                                      styles.imageContainerYoutubeImage
                                    }
                                  >
                                    <LazyLoadImage
                                      className={styles.thumbNailImage}
                                      src={
                                        "https://img.youtube.com/vi/" +
                                        youtube_full_album.slice(-11) +
                                        "/maxresdefault.jpg"
                                      }
                                      effect="blur"
                                      alt={album_name}
                                    />
                                  </div>
                                </a>

                                <div className={styles.streamLinks}>
                                  <a
                                    href={bandcamp}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      src={bandCampLogo}
                                      alt="Bandcamp Link"
                                    />
                                  </a>
                                  {spotify ? (
                                    <a
                                      href={spotify}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <img
                                        src={spotifyLogo}
                                        alt="Spotify Link"
                                      />
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
                                  <a
                                    href={mp3}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <p>MP3</p>
                                  </a>
                                  <a
                                    href={wav}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <p>WAV</p>
                                  </a>
                                  {flac ? (
                                    <a
                                      href={flac}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <p>FLAC</p>
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          }
                        )}

                      <div className={styles.appearsOnSectionHeader}>
                        {category.toLowerCase() === "dj" ? <h1>Mixes:</h1> : ""}
                      </div>

                      {mix

                        .filter(
                          (e) => e.name.toLowerCase() === name.toLowerCase()
                        )
                        .sort((a, b) => b.year - a.year)
                        .map(({ name, mix, id, type, year }) => {
                          return (
                            <div key={id} className={styles.djMixElements}>
                              <a
                                href={
                                  "https://www.youtube.com/watch?v=" +
                                  mix.slice(-11)
                                }
                                title={
                                  !type
                                    ? "Check out the Mix from " + name + ".."
                                    : "Check out the " +
                                      type +
                                      " from " +
                                      name +
                                      ".."
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                {/* Mix will be default name if nothing is entered in the mix list */}
                                <div className={styles.yearInfo}>
                                  {type ? <p>{type}</p> : <p>Mix</p>}
                                  <p>{year}</p>
                                </div>
                                <div className={styles.djMixContainerThumbnail}>
                                  <LazyLoadImage
                                    className={styles.thumbNailImageMix}
                                    src={
                                      "https://img.youtube.com/vi/" +
                                      mix.slice(-11) +
                                      "/hqdefault.jpg"
                                    }
                                    effect="blur"
                                    alt={name + mix.type}
                                  />
                                </div>
                              </a>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        <h2 className={styles.footerBackLink}>
          <HashLink smooth to={"#"}>
            Go to top of Page
          </HashLink>
        </h2>
      </div>
    </main>
  );
};

export default ArtistDetail;
