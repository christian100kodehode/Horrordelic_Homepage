// Import CSS
import styles from "./Main.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
// Import images
import HorrordelicLogo from "../images/horrordelic.jpg";
// Import Components/Hooks
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineTwitter, AiOutlineFacebook, AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FaBandcamp } from "react-icons/fa";

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

  console.log(youTubeImage);

  const LatestAlbumScrollText = () => {
    return (
      <>
        <span className={styles.latestAlbumDetails}>Latest&nbsp;Release:&nbsp;&nbsp;</span>
        &nbsp;&nbsp;
        <LazyLoadImage
          className={styles.thumbNailImage}
          src={"https://img.youtube.com/vi/" + youTubeImage + "/1.jpg"}
          // effect="blur"
          alt={latestAlbum.album_name}
        />
        &nbsp;
        <a href="/release">
          &nbsp;{latestAlbum.artist}:&nbsp;{latestAlbum.album_name}&nbsp;&nbsp;
        </a>
        &nbsp;&nbsp;
        <span className={styles.latestAlbumDetails}>{latestAlbum.release_date}</span>
      </>
    );
  };

  return (
    <main className={styles.Main}>
      {/* {lastReleasedAlbum.map(({ artist, id }) => {
        <p>{artist}</p>;
      })} */}

      <div
        className={styles.marquee}
        // style={{
        //   backgroundImage: "url(" + "https://img.youtube.com/vi/" + youTubeImage + "/1.jpg" + ")",
        //   backgroundRepeat: "round",
        //   backdropFilter: "sepia(90%)",
        // }}
      >
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
          <h2>
            New site in the <span style={{ color: "white" }}>making...</span>
          </h2>
          <h2>
            Stay tuned and get some{" "}
            <span style={{ color: "white" }} href="/release">
              <a href="/release">releases</a>
            </span>{" "}
            <div>
              Horrordelic: <span style={{ color: "white" }}> Darkpsy Life</span>
            </div>
          </h2>
        </div>
        <LazyLoadImage src={HorrordelicLogo} alt="Horrordelic Logo" className={styles.Logo} effect="blur" />

        <div className={styles.mainLinks}>
          <a href="https://horrordelic.bandcamp.com" target="_blank" rel="noreferrer" alt="BandCamp" className={styles.mainLinksChild}>
            <FaBandcamp size={40} />
          </a>
          <a href="https://youtube.com/horrordelic" target="_blank" rel="noreferrer" alt="Facebook" className={styles.mainLinksChild}>
            <AiOutlineYoutube size={40} />
          </a>

          <a href="https://instagram.com/horrordelic" target="_blank" rel="noreferrer" alt="Instagram" className={styles.mainLinksChild}>
            <AiOutlineInstagram size={40} />
          </a>
          <a href="https://twitter.com/horrordelic" target="_blank" rel="noreferrer" alt="Twitter" className={styles.mainLinksChild}>
            <AiOutlineTwitter size={40} />
          </a>
          <a href="https://facebook.com/horrordelic" target="_blank" rel="noreferrer" alt="Facebook" className={styles.mainLinksChild}>
            <AiOutlineFacebook size={40} />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Main;
