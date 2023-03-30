import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ArtistDetail.module.css";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

// Importing images
import bandCampLogo from "../images/bc-logotype-color-128.png";
import spotifyLogo from "../images/spotifyLogo.png";
import youtubeLogo from "../images/youtubeLogo.png";
import { BsFillFileMusicFill } from "react-icons/bs";
import { BsFillChatDotsFill } from "react-icons/bs";

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

  console.log(mix);

  const params = useParams();

  return (
    <main className={styles.container}>
      <div className={styles.cssFix}>
        {list
          .filter((e) => e.nameNoSpace === params.id)
          .map(({ name, category, id, headerInfo, artists_text, soundcloud, facebook, nameNoSpace }) => {
            return (
              <div key={id + name} className={styles.artistsContainer}>
                <div className={styles.imageContainer}>
                  <LazyLoadImage
                    className={styles.headerImage}
                    src={"/artists/" + nameNoSpace + "Banner" + ".jpg"}
                    alt={name.replace(/ /g, " ")}
                    title={name.replace(/ /g, " ")}
                    effect="blur"
                    placeholderSrc={"/artists/ArtistPlaceholder.jpg"}
                  />
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
                          <a href={facebook} target="_blank" rel="noreferrer" title="Contact..">
                            <button>
                              <BsFillChatDotsFill />
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                        {soundcloud ? (
                          <a href={soundcloud} target="_blank" rel="noreferrer" title="Music..">
                            <button>
                              <BsFillFileMusicFill />
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
                    {headerInfo ? headerInfo.toLowerCase() + "," : ""} {category.toUpperCase()}
                  </h2>
                </div>
                <div className={styles.artistText}>
                  <p>{artists_text}</p>
                </div>
                <div>
                  {/* Filter on first name before whitespace + second name, show these */}
                  {album
                    .filter(
                      (e) =>
                        e.release_text.includes(name.split(" ")[0] + " " + name.split(" ")[1]) +
                        e.credits.includes(name.split(" ")[0] + " " + name.split(" ")[1])
                    )
                    .map(({ album_name, youtube_full_album, youtube_playlist_embed, spotify, bandcamp, mp3, wav }) => {
                      return (
                        <div className={styles.appearsOnSection}>
                          {/* Check if artists or dj, change text accordingly */}
                          {category === "artist" ? <h1>Appears on: </h1> : <h1>Compiled:</h1>}
                          <a href={bandcamp} target="_blank" rel="noreferrer">
                            <p className={styles.albumReleaseNameStream}>{album_name}</p>
                            <LazyLoadImage
                              className={styles.thumbNailImage}
                              src={"https://img.youtube.com/vi/" + youtube_full_album.slice(-11) + "/hqdefault.jpg"}
                              effect="blur"
                              alt={album_name}
                            />
                          </a>
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
                      );
                    })}
                  <div className={styles.appearsOnSection}>{category.toLowerCase() === "dj" ? <h1>Mixes:</h1> : ""}</div>

                  <div className={styles.djMixes}>
                    {mix
                      .filter((e) => e.name.toLowerCase() === name.toLowerCase())
                      .map(({ name, mix, id }) => {
                        return (
                          <div key={id}>
                            <a href={"https://www.youtube.com/watch?v=" + mix.slice(-11)} title={name + "dj mix"} target="_blank" rel="noreferrer">
                              <LazyLoadImage
                                className={styles.thumbNailImageMix}
                                src={"https://img.youtube.com/vi/" + mix.slice(-11) + "/hqdefault.jpg"}
                                effect="blur"
                                alt={name + "dj mix"}
                              />
                            </a>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default ArtistDetail;
