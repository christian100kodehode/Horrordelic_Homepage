// Import CSS
import styles from "./Main.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
// Import images
import HorrordelicLogo from "../images/horrordelic.jpg";
// Import Components/Hooks
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // State for Release data
  const [album, setAlbum] = useState([]);
  const [latestAlbum, setLatestAlbum] = useState([]);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(
      async () => {
        const API_URL = `./release-list.json`;
        const response = await axios.get(API_URL);
        setAlbum(response.data);
        setLatestAlbum(response.data[0]);
        setIsLoading(false);

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

  console.log(latestAlbum.artist);

  const LatestAlbumScrollText = () => {
    return (
      <>
        <span className={styles.latestAlbumDetails}>Latest out now:</span>
        <a href="/release">
          &nbsp;{latestAlbum.artist}: &nbsp;&nbsp;
          {latestAlbum.album_name} &nbsp;&nbsp;
        </a>
        <span className={styles.latestAlbumDetails}>{latestAlbum.release_date}</span>
      </>
    );
  };

  return (
    <main className={styles.Main}>
      {/* {lastReleasedAlbum.map(({ artist, id }) => {
        <p>{artist}</p>;
      })} */}

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
        <div>
          <h1>Welcome! </h1>
          <h1>New site in the making...</h1>
          <h1>Stay tuned and get some releases while we get the page to 100%</h1>
        </div>
        <LazyLoadImage src={HorrordelicLogo} alt="Horrordelic Logo" className={styles.Logo} effect="blur" />
      </div>
    </main>
  );
};

export default Main;
