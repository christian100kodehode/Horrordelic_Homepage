import { useLocation } from "react-router-dom";
import styles from "./SearchResults.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import bandCampLogo from "../images/bc-logotype-color-128.png";
import spotifyLogo from "../images/spotifyLogo.png";
import youtubeLogo from "../images/youtubeLogo.png";
import HorrordelicLogo from "../images/horrordelic.jpg";

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Get query from URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/release-list.json`); // Update with your JSON path
        if (!response.ok) throw new Error("Failed to fetch JSON");
        const data = await response.json();

        // Filter results based on artist or tracklist
        const filteredResults = data.filter(
          (item) =>
            item.artist.toLowerCase().includes(query.toLowerCase()) ||
            item.tracklist.some((track) =>
              track.toLowerCase().includes(query.toLowerCase())
            )
        );

        setResults(filteredResults);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching JSON:", err);
        setError("Failed to load results");
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]); // Re-run when query changes

  function navigateManagamentBack() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // Navigates back one step in history
    };

    return (
      <button
        onClick={() => {
          goBack();
        }}
      >
        GoBack
      </button>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <h1
        className={styles.appearsOnSectionHeader}
        style={{ textDecoration: "underline" }}
      >
        Search Results {query ? `for "${query}"` : ""}
      </h1>
      {results.length === 0 ? (
        <a href="https://horrordelic.com/Releases">
          <LazyLoadImage
            src={HorrordelicLogo}
            alt="Horrordelic Logo"
            className={styles.Logo}
            effect="blur"
          />
          <h1
            className={styles.appearsOnSectionHeader}
            style={{ textDecoration: "underline" }}
          >
            No results found. Try our Release page..
          </h1>
        </a>
      ) : (
        <ul className={styles.resultsList}>
          {results.map((item) => (
            <li key={item.id} className={styles.artistContainer}>
              <ul className={styles.appearsOnSection}>
                {item.tracklist
                  .filter((track) =>
                    track.toLowerCase().includes(query.toLowerCase())
                  )
                  .map(
                    (
                      track,
                      index,
                      youtube_full_album,
                      path,
                      artist,
                      album_name,
                      bandcamp,
                      youtube_playlist_embed,
                      mp3,
                      wav,
                      flac,
                      spotify
                    ) => (
                      <li key={index} className={styles.appearsOnSection}>
                        <p> {track}</p>
                        <div
                          className={styles.appearsOnSection}
                          key={album_name}
                        >
                          <a
                            href={
                              "https://horrordelic.com/release/" + item.path
                            }
                            target="_self"
                            // rel="noreferrer"
                          >
                            <p className={styles.appearsOnSectionText}>
                              {item.artist}: {item.album_name}
                            </p>
                            <div className={styles.imageContainerYoutubeImage}>
                              <LazyLoadImage
                                className={styles.thumbNailImage}
                                src={
                                  "https://img.youtube.com/vi/" +
                                  item.youtube_full_album.slice(-11) +
                                  "/maxresdefault.jpg"
                                }
                                effect="blur"
                                alt={item.album_name}
                              />
                            </div>
                          </a>

                          <div className={styles.streamLinks}>
                            <a
                              href={item.bandcamp}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img src={bandCampLogo} alt="Bandcamp Link" />
                            </a>
                            {spotify ? (
                              <a
                                href={item.spotify}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img src={spotifyLogo} alt="Spotify Link" />
                              </a>
                            ) : (
                              ""
                            )}

                            <a
                              href={item.youtube_playlist_embed}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img src={youtubeLogo} alt="Youtube Link" />
                            </a>
                            <a href={item.mp3} target="_blank" rel="noreferrer">
                              <p>MP3</p>
                            </a>
                            <a href={item.wav} target="_blank" rel="noreferrer">
                              <p>WAV</p>
                            </a>
                            {flac ? (
                              <a
                                href={item.flac}
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
                      </li>
                    )
                  )}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <span className={styles.backButton}>{navigateManagamentBack()}</span>
    </div>
  );
};

export default SearchResults;
