import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./SearchResults.module.css";
import bandCampLogo from "../images/bc-logotype-color-128.png";
import spotifyLogo from "../images/spotifyLogo.png";
import youtubeLogo from "../images/youtubeLogo.png";
import HorrordelicLogo from "../images/horrordelic.jpg";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const MINIMUM_LOADING_TIME = 2000; // 2 seconds in milliseconds

    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(`/release-list.json`);
        if (!response.ok) throw new Error("Failed to fetch JSON");
        const data = await response.json();

        const filteredResults = data.filter(
          (item) =>
            item.artist.toLowerCase().includes(query.toLowerCase()) ||
            item.tracklist.some((track) =>
              track.toLowerCase().includes(query.toLowerCase())
            )
        );

        setResults(filteredResults);
      } catch (err) {
        console.error("Error fetching JSON:", err);
        setError("Failed to load results");
      }
    };

    const loadDataWithMinimumTime = async () => {
      setLoading(true);
      const startTime = Date.now();

      // Run fetchResults and wait for it to complete
      await fetchResults();

      // Calculate how much time has passed
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MINIMUM_LOADING_TIME - elapsedTime;

      // If fetch took less than MINIMUM_LOADING_TIME, wait for the remaining time
      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      setLoading(false);
    };

    loadDataWithMinimumTime();

    // Cleanup not strictly necessary here since Promise resolves, but good practice
    return () => {};
  }, [query]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.resultsContainer}>
     
         <meta
                  property="og:title"
                  content={
                   {query} + "Search results.."
                  }
                />
                <meta
                  property="og:description"
                  content="Worldwide Psychedelic Movement - Darkpsy Life."
                />
                 <title>Search results..</title>
      {/* Inline CSS for the progress bar */}
      <style jsx>{`
        .progress-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          background-image: var(--backgroundImage);
        }
        .progress-bar {
          width: 200px;
          height: 88px;
          background: var(--accentTransp);
          border-radius: 40px;
          overflow: hidden;
        }
        .progress {
          width: 0;
          height: 100%;
          background: black;
          animation: progress 2s ease-in-out infinite;
        }
        @keyframes progress {
          0% {
            width: 0;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0;
          }
        }
        .sr-only {
          position: absolute;
          width: 1;
          height: 100vh;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>

      {loading ? (
        <div
          className="progress-container"
          style={{
            height: "100vh",
            backgroundImage: "background-image: var(--backgroundImage)",
          }}
        >
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <h2>{error}</h2>
        </div>
      ) : (
        <>
          <h1
            className={styles.appearsOnSectionHeader}
            style={{ textDecoration: "underline" }}
          >
            Search Results {query ? `for "${query}"` : ""}
          </h1>
          {results.length === 0 ? (
            <a href="https://horrordelic.com/Releases">
              <h1
                className={styles.appearsOnSectionHeader}
                style={{ textDecoration: "underline" }}
              >
                No results found. Try our Release page...
              </h1>
              <LazyLoadImage
                src={HorrordelicLogo}
                alt="Horrordelic Logo"
                className={styles.Logo}
                height="auto"
                width="30%"
                margin="20% auto"
              />
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
                      .map((track, index) => (
                        <li key={index} className={styles.appearsOnSection}>
                          <p>{track}</p>
                        
                            <a
                              href={`https://horrordelic.com/release/${item.path}`}
                              target="_self"
                            >
                              <p className={styles.appearsOnSectionText}>
                                {item.artist}: {item.album_name}
                              </p>
                              <div
                                className={styles.imageContainerYoutubeImage}
                              >
                                <LazyLoadImage
                                  className={styles.thumbNailImage}
                                  src={`https://img.youtube.com/vi/${item.youtube_full_album.slice(
                                    -11
                                  )}/maxresdefault.jpg`}
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
                              {item.spotify && (
                                <a
                                  href={item.spotify}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img src={spotifyLogo} alt="Spotify Link" />
                                </a>
                              )}
                              <a
                                href={item.youtube_playlist_embed}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img src={youtubeLogo} alt="Youtube Link" />
                              </a>
                              <a
                                href={item.mp3}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <p>MP3</p>
                              </a>
                              <a
                                href={item.wav}
                                target="_blank"
                                rel="noreferre"
                              >
                                <p>WAV</p>
                              </a>
                              {item.flac && (
                                <a
                                  href={item.flac}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <p>FLAC</p>
                                </a>
                              )}
                            </div>
                        
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
          <div styles={{ width: "100%" }}>
            <span className={styles.backButton}>
              <button onClick={goBack}>← Go Back</button>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
