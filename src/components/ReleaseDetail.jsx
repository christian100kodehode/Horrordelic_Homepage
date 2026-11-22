import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ReleaseDetail.module.css";
import { useParams, Link, useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HashLink } from "react-router-hash-link";
import YoutubePlayer from "./YoutubePlayer";

// Importing images
import bandCampLogo from "../images/bc-logotype-color-128.png";
import spotifyLogo from "../images/spotifyLogo.png";
import youtubeLogo from "../images/youtubeLogo.png";
import youtubeLogoSvg from "../images/youtubePlayButton.svg";

const ReleaseDetail = () => {
  const { path } = useParams();

  const [artist, setArtist] = useState({ name: {} });

  // Imported from Release.jsx
  const today = new Date();
  const yearNow = today.getFullYear();
  const [isSelected, setIsSelected] = useState(yearNow.toString());
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

  // State for loading Artist data
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const fetchData = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const API_URL = `/artist-list.json`;
      const response = await axios.get(API_URL);
      setList(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get release data for artists releases and compilations
  const [album, setAlbum] = useState([]);
  const [isLoadingRelease, setIsLoadingRelease] = useState(false);

  const fetchDataRelease = () => {
    setIsLoadingRelease(true);
    setTimeout(async () => {
      const API_URL = `/release-list.json`;
      const response = await axios.get(API_URL);
      setAlbum(response.data);
      setIsLoadingRelease(false);
    });
  };

  useEffect(() => {
    fetchDataRelease();
  }, []);

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

  // TESTING
  function getLastWordCap({ credits }) {
    const text = credits || "";
    const firstNonEmptyLine =
      text.split("\n").find((line) => line.trim() !== "") || "" || "\n\n";
    const lastWord = firstNonEmptyLine.trim().split(" ").pop() || "";
    const lastWordCap = lastWord.charAt(0).toUpperCase() + lastWord.slice(1);

    return lastWordCap;
  }

  function getFirstWordCap({ credits }) {
    const text = credits || "";

    const wordsToRemove = [
      ": ",
      "Compile",
      "Compiled",
      "compiled",
      "Music",
      "music",
      "by",
      "By",
      "Artwork",
      "art",
      "Art",
      "artwork",
      "And",
      "and",
      "Produced",
      " ",
      "   ",
      "  ",
      "    ",
    ];
    const regex = new RegExp(`\\b(${wordsToRemove.join("|")})\\b`, "gi");

    const firstNonEmptyLine =
      text.split("\n").find((line) => line.trim() !== "") || "" || "\n\n";

    const firstWord = firstNonEmptyLine.trim().replace(regex, "");
    return firstWord;
  }

  const artistMap = Object.fromEntries(
    list.map(({ nameNoSpace, name }) => [
      nameNoSpace.toLowerCase(),
      { nameNoSpace, name },
    ]),
  );

  const params = useParams();

  // Function to extract visible artists AND hidden (artist: ...) tag artists
  const extractArtists = (track) => {
    const hiddenMatch = track.match(/\(artist:\s*([^)]+)\)/i);
    const hiddenArtists = hiddenMatch
      ? hiddenMatch[1]
          .split(/\s*(?:,|&|vs|\band\b)\s*/i)
          .map((a) => a.trim())
          .filter(Boolean)
      : [];

    const cleanTrack = track.replace(/\s*\((?:artist|alias|tag):[^)]*\)/gi, "");
    const [artistPart] = cleanTrack.split(" - ");

    const mainArtists = artistPart
      .replace(/^\d+\.\s*/, "")
      .split(/\s*(?:&|vs)\s*/i)
      .map((artist) => artist.trim())
      .filter(Boolean);

    return { mainArtists, hiddenArtists };
  };

  return (
    <main className={styles.container}>
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
            const firstWordCap = getFirstWordCap({ credits });

            return (
              <article
                key={path}
                className={styles.releaseContainer}
                id={path}
                ref={
                  path === window.location.hash.slice(1) ? selectedRef : null
                }
              >
                <meta
                  property="og:title"
                  content={
                    artist + " " + album_name + " " + "Download and Stream"
                  }
                />
                <meta
                  property="og:description"
                  content="Worldwide Psychedelic Movement - Darkpsy Life."
                />
                <meta
                  property="og:image"
                  content={
                    "https://img.youtube.com/vi/" +
                    youtube_full_album.slice(-11) +
                    "/maxresdefault.jpg"
                  }
                />
                <meta
                  property="og:url"
                  content={"https://horrordelic.com/Release/" + path}
                />
                <title>{artist + " " + album_name}</title>

                <div className={styles.releaseName}>
                  <p className={styles.heading}>
                    &nbsp;{artist}:&nbsp;{album_name}
                    <span className={styles.headingLand}>{land}</span>
                  </p>
                  {(() => {
                    const names = firstWordCap
                      .split("&")
                      .map((s) => s.trim())
                      .filter(Boolean);

                    const matchedParts = [];

                    names.forEach((displayName, idx) => {
                      const match = list.find((entry) => {
                        const a = entry.name
                          .replace(/\s+/g, "")
                          .toLowerCase()
                          .replace(/\./g, "");
                        const b = displayName
                          .replace(/\s+/g, "")
                          .toLowerCase()
                          .replace(/\./g, "");
                        return a === b || a.includes(b) || b.includes(a);
                      });

                      if (match && match.nameNoSpace?.trim()) {
                        const sep = matchedParts.length > 0 ? " & " : "";
                        matchedParts.push(
                          <React.Fragment key={idx}>
                            {sep}
                            <Link
                              className={styles.artistLink}
                              to={`../Artists/${match.nameNoSpace.trim()}`}
                            >
                              {match.name}
                            </Link>
                          </React.Fragment>,
                        );
                      }
                    });

                    if (matchedParts.length === 0) {
                      return null;
                    }

                    const prefix =
                      artist === "VA" ? "Compiled by: " : "Made by: ";

                    if (matchedParts.length >= 4) {
                      const mid = Math.ceil(matchedParts.length / 2);
                      return (
                        <div>
                          {prefix}
                          <div>{matchedParts.slice(0, mid)}</div>
                          <div>{matchedParts.slice(mid)}</div>
                        </div>
                      );
                    }

                    return (
                      <div
                        style={{
                          fontFamily: "helveticaNeue",
                          fontSize: "1rem",
                        }}
                      >
                        {prefix}
                        {matchedParts}
                      </div>
                    );
                  })()}
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
                              }}
                            >
                              <div className={styles.videoInner}>
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
                                <LazyLoadImage
                                  alt="Play Video"
                                  src={youtubeLogoSvg}
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

                  {/* Album info - Always visible */}
                  <div className={styles.header}>
                    <div className={styles.break}></div>

                    <div className={styles.cssFix}>
                      <div id={album_name} className={styles.readMoreContainer}>
                        <div
                          style={{ padding: "1em" }}
                          className={styles.readMoreText}
                        >
                          {release_text && <p>{release_text}</p>}
                          <p>Credits:</p>
                          <p>{credits}</p>
                          <p>Release date:</p>
                          <p>{release_date}</p>

                          <div className={styles.trackList}>
                            <div
                              style={{ padding: "0em", fontSize: "1.7em" }}
                              className={styles.readMoreContainer}
                            >
                              Track list:
                            </div>
                            {tracklist.map((track, i) => {
                              const { mainArtists, hiddenArtists } =
                                extractArtists(track);

                              const displayTrack = track
                                .replace(
                                  /\s*\((?:artist|alias|tag):[^)]*\)/gi,
                                  "",
                                )
                                .trim();

                              // Separate leading track number (e.g., "01. ") so it stays unlinked
                              const trackNumMatch =
                                displayTrack.match(/^(\d+\.\s*)/);
                              const trackNum = trackNumMatch
                                ? trackNumMatch[1]
                                : "";
                              const trackWithoutNum = trackNum
                                ? displayTrack.slice(trackNum.length)
                                : displayTrack;

                              // CASE A: Track has hidden (artist: ...) tags
                              if (hiddenArtists.length > 0) {
                                const matchedHidden = hiddenArtists
                                  .map((ta) =>
                                    list.find(
                                      (a) =>
                                        a.name.toLowerCase() ===
                                        ta.toLowerCase(),
                                    ),
                                  )
                                  .filter(Boolean);

                                if (trackWithoutNum.includes(" - ")) {
                                  const [artistSide, ...titleParts] =
                                    trackWithoutNum.split(" - ");
                                  const titleSide =
                                    " - " + titleParts.join(" - ");

                                  // 2+ hidden artists -> trackNum stays plain text, artistSide & titleSide get linked
                                  if (
                                    matchedHidden.length >= 2 &&
                                    matchedHidden[0]?.nameNoSpace &&
                                    matchedHidden[1]?.nameNoSpace
                                  ) {
                                    return (
                                      <pre key={i}>
                                        {trackNum && <span>{trackNum}</span>}
                                        <Link
                                          to={`/Artist/${matchedHidden[0].nameNoSpace.trim()}`}
                                          title={`Go to ${matchedHidden[0].name}`}
                                        >
                                          {artistSide}
                                        </Link>
                                        <Link
                                          to={`/Artist/${matchedHidden[1].nameNoSpace.trim()}`}
                                          title={`Go to ${matchedHidden[1].name}`}
                                        >
                                          {titleSide}
                                        </Link>
                                      </pre>
                                    );
                                  }

                                  // 1 hidden artist -> trackNum stays plain text, ONLY artistSide is linked
                                  if (matchedHidden[0]?.nameNoSpace) {
                                    return (
                                      <pre key={i}>
                                        {trackNum && <span>{trackNum}</span>}
                                        <Link
                                          to={`/Artist/${matchedHidden[0].nameNoSpace.trim()}`}
                                          title={`Go to ${matchedHidden[0].name}`}
                                        >
                                          {artistSide}
                                        </Link>
                                        <span>{titleSide}</span>
                                      </pre>
                                    );
                                  }
                                }
                              }

                              // CASE B: Normal track without hidden tags -> link each matched name inline
                              const matchedMain = list.filter((a) =>
                                mainArtists.some(
                                  (ma) =>
                                    ma.toLowerCase() === a.name.toLowerCase(),
                                ),
                              );

                              if (matchedMain.length === 0) {
                                return (
                                  <pre key={i}>
                                    <span>{displayTrack}</span>
                                  </pre>
                                );
                              }

                              const escapedNames = matchedMain
                                .map((a) =>
                                  a.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                                )
                                .join("|");
                              const splitRegex = new RegExp(
                                `(\\b(?:${escapedNames})\\b)`,
                                "gi",
                              );
                              const parts = trackWithoutNum.split(splitRegex);

                              return (
                                <pre key={i}>
                                  {trackNum && <span>{trackNum}</span>}
                                  {parts.map((part, idx) => {
                                    const matchedArtist = matchedMain.find(
                                      (a) =>
                                        a.name.toLowerCase() ===
                                        part.toLowerCase(),
                                    );
                                    if (matchedArtist?.nameNoSpace) {
                                      return (
                                        <Link
                                          key={idx}
                                          to={`/Artist/${matchedArtist.nameNoSpace.trim()}`}
                                          title={`Go to ${matchedArtist.name}`}
                                        >
                                          {part}
                                        </Link>
                                      );
                                    }
                                    return <span key={idx}>{part}</span>;
                                  })}
                                </pre>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          },
        )}

      <span className={styles.backButton}>{navigateManagamentBack()}</span>
      <h2 style={isLoading ? { display: "none" } : { display: "" }}>
        <HashLink smooth to={"#top"}>
          Go to top of Page
        </HashLink>
      </h2>
    </main>
  );
};

export default ReleaseDetail;