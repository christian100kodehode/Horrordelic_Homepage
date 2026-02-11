// Import CSS
import styles from "./Main.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
// Import images
// import HorrordelicLogo from "../images/horrordelic.jpg";
// import HorrordelicSantaLogo from "../images/HorrordelicSantaLogo.png";
// Import Components/Hooks
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineX,
} from "react-icons/ai";
import { FaBandcamp, FaFacebook, FaSun } from "react-icons/fa";
import SearchBar from "./SearchBar";
import YoutubePlaylistEmbed from "./YoutubePlaylistEmbed";

const Main = () => {
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // States for Release data
  // const [album, setAlbum] = useState([]);
  const [latestAlbum, setLatestAlbum] = useState([]);
  const [youTubeImage, setYouTubeImage] = useState([]);

  // Get Data and set latest album as the first (in position 0).
  const fetchData = () => {
    setIsLoading(true);
    const API_URL = `./release-list.json`;
    axios.get(API_URL).then((response) => {
      setLatestAlbum(response.data[0]);
      setIsLoading(false);
      setYouTubeImage(response.data[0].youtube_full_album.slice(-11));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(youTubeImage);

  const LatestAlbumScrollText = () => {
    return (
      <>
        <span className={styles.latestAlbumDetails}>
          <title>Welcome to Horrordelic HQ</title>
        </span>{" "}
        <Link to={"../Release/" + latestAlbum.path}>
          <span className={styles.marqueeText}>OUT NOW </span>
        </Link>
        <span className={styles.marqueeText}>
          <Link to={"../Release/" + latestAlbum.path}>
            <LazyLoadImage
              className={styles.thumbNailImage}
              src={
                "https://img.youtube.com/vi/" + youTubeImage + "/hqdefault.jpg"
              }
              // effect="blur"
              alt={latestAlbum.album_name}
            />
          </Link>
        </span>
        &nbsp;
        <a href={"../Release/" + latestAlbum.path}>
          &nbsp;{latestAlbum.artist}:&nbsp;{latestAlbum.album_name}
        </a>
        &nbsp;
        <Link to={"../Release/" + latestAlbum.path}>
          <span className={styles.marqueeTextDate}>
            {latestAlbum.release_date}
          </span>
        </Link>
      </>
    );
  };

  return (
    <div className={styles.mainAndFooterBox}>
      <main className={styles.main}>
        <div className={styles.marquee}>
          <div className={styles.marqueeone}>
            <LatestAlbumScrollText />
          </div>

          {/* <div className={styles.marqueetwo}>
          <LatestAlbumScrollText />
        </div>
        <div className={styles.marqueethree}>
          <LatestAlbumScrollText />
        </div> */}
          {/* If more is needed */}
          {/* <div className={styles.marqueefour}>
        <LatestAlbumScrollText />
        </div> */}
        </div>

        <div className={styles.centerTextBox}>
          <div className={styles.leftvideoBox}>
            <p style={{ fontSize: "2rem" }}>Latest videos:</p>
            <YoutubePlaylistEmbed playlistId="PLNlcSeDBp29-_PCRyKMcQA1mcFzrZhv0d" />
          </div>

          <div className={styles.centerText}>
            <h1>Darkpsy Life - Since 2011</h1>
            <h1>
              <Link
                to="/release"
                title="Go to our releases.."
                style={{ color: "black" }}
              >
                Click for latest Releases!
              </Link>
            </h1>
            <h1>
              <SearchBar id="searchQuery" />
            </h1>
          </div>
        </div>
      </main>

      <div className={styles.footerLinks}>
        <span className={styles.mainLinksText}>
          <p>Visit our sites below:</p>
        </span>
        <div className={styles.mainLinks}>
          <a
            href="https://horrordelic.bandcamp.com"
            target="_blank"
            rel="noreferrer"
            alt="BandCamp"
            className={styles.mainLinksChild}
            title="Bandcamp"
          >
            <FaBandcamp size={40} />
          </a>
          <a
            href="https://youtube.com/horrordelic"
            title="Youtube"
            target="_blank"
            rel="noreferrer"
            alt="Facebook"
            className={styles.mainLinksChild}
          >
            <AiOutlineYoutube size={40} />
          </a>

          <a
            href="https://instagram.com/horrordelic"
            title="Instagram"
            target="_blank"
            rel="noreferrer"
            alt="Instagram"
            className={styles.mainLinksChild}
          >
            <AiOutlineInstagram size={40} />
          </a>
          <a
            href="https://x.com/horrordelic"
            title="X"
            target="_blank"
            rel="noreferrer"
            alt="X"
            className={styles.mainLinksChild}
          >
            <AiOutlineX size={30} />
          </a>
          <a
            href="https://facebook.com/horrordelic"
            title="Facebook"
            target="_blank"
            rel="noreferrer"
            alt="Facebook"
            className={styles.mainLinksChild}
          >
            <FaFacebook size={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
