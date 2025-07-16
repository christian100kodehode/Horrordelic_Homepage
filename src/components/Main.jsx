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
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FaBandcamp } from "react-icons/fa";
import SearchBar from "./SearchBar";

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
    setTimeout(
      async () => {
        const API_URL = `./release-list.json`;
        const response = await axios.get(API_URL);
        // setAlbum(response.data);
        setLatestAlbum(response.data[0]);
        setIsLoading(false);
        setYouTubeImage(response.data[0].youtube_full_album.slice(-11));
        // Old version:
        // Get the URL and add the hash then scrollintoView on load
        // let a = new URL(window.location.href);
        // document.querySelector(a.hash).scrollIntoView();
      }
      // 2000 - if wanting timeout
    );
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
          <span className={styles.marqueeTextDate}>OUT NOW </span>
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
    <main className={styles.Main}>
      <div className={styles.marquee}>
        <div className={styles.marqueeone}>
          <LatestAlbumScrollText />
        </div>
        <div className={styles.marqueetwo}>
          <LatestAlbumScrollText />
        </div>
        <div className={styles.marqueethree}>
          <LatestAlbumScrollText />
        </div>
        {/* If more is needed */}
        {/* <div className={styles.marqueefour}>
        <LatestAlbumScrollText />
        </div> */}
      </div>
      <div className={styles.Container}>
        <div className={styles.centerText}>
          <h1>Welcome! </h1>
          <h1>
            Site up and running -{" "}
            <span style={{ color: "var(--accent)" }}>Search just added!</span>
          </h1>
          <h1>
            Stay tuned and get all the{" "}
            <span style={{ color: "var(--accent)" }} href="/release">
              <a href="/release" title="Go to our releases..">
                Releases!
              </a>
            </span>
            <div>
              <SearchBar />
              Horrordelic:{" "}
              <span style={{ color: "var(--accent)" }}> Darkpsy Life</span>
            </div>
          </h1>
        </div>
        {/*  */}
        {/* <VFXImg
          src={HorrordelicLogo}
          className={styles.Logo}
          shader="glitch"    
        /> */}
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
            href="https://twitter.com/horrordelic"
            title="Twitter"
            target="_blank"
            rel="noreferrer"
            alt="Twitter"
            className={styles.mainLinksChild}
          >
            <AiOutlineTwitter size={40} />
          </a>
          <a
            href="https://facebook.com/horrordelic"
            title="Facebook"
            target="_blank"
            rel="noreferrer"
            alt="Facebook"
            className={styles.mainLinksChild}
          >
            <AiOutlineFacebook size={40} />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Main;
