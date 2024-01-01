// Import CSS
import styles from "./Main.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
// Import images
import HorrordelicLogo from "../images/horrordelic.jpg";
import HorrordelicSantaLogo from "../images/HorrordelicSantaLogo.png";
// Import Components/Hooks
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FaBandcamp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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
          <Link to={"/release/" + latestAlbum.path}>
            <span className={styles.marqueeText}>
              Latest&nbsp;Release:&nbsp;&nbsp;
            </span>
          </Link>
        </span>
        &nbsp;&nbsp;
        <span className={styles.marqueeText}>
          <Link to={"/release/" + latestAlbum.path}>
            <LazyLoadImage
              className={styles.thumbNailImage}
              src={"https://img.youtube.com/vi/" + youTubeImage + "/1.jpg"}
              // effect="blur"
              alt={latestAlbum.album_name}
            />
          </Link>
        </span>
        &nbsp;
        <a href={"/release/" + latestAlbum.path}>
          &nbsp;{latestAlbum.artist}:&nbsp;{latestAlbum.album_name}&nbsp;&nbsp;
        </a>
        &nbsp;&nbsp;
        <span className={styles.latestAlbumDetails}>
          <Link to={"/release/" + latestAlbum.path}>
            <span className={styles.marqueeText}>
              {latestAlbum.release_date}
            </span>
          </Link>
        </span>
      </>
    );
  };

  return (
    <main className={styles.Main}>
      {/* <Helmet>
        <meta property="og:url" content="https://horrordelic.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Horrordelic - Darkpsy Life." />
        <meta property="og:description" content="Worldwide Psychedelic Movement - Darkpsy Life." />
        <meta property="og:image" content="https://horrordelic.com/FBwebmediaFront1080x600.png" />
      </Helmet> */}
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
            Site up and{" "}
            <span style={{ color: "var(--accent)" }}>running...</span>
          </h2>
          <h2>
            Stay tuned and get all the{" "}
            <span style={{ color: "var(--accent)" }} href="/release">
              <a href="/release" title="Go to our releases..">
                Releases.
              </a>
            </span>
            {/* <div className={styles.calenderContainer}>
              <div className={styles.calenderMobileLink}>
                Get up to date here:&nbsp;
                <a href="/ReleaseAndEvents" title="Check our scheduele..">
                  Calender.
                </a>
              </div>
            </div> */}
            <div>
              Horrordelic:{" "}
              <span style={{ color: "var(--accent)" }}> Darkpsy Life</span>
            </div>
          </h2>
        </div>
        <LazyLoadImage
          src={HorrordelicSantaLogo}
          alt="Horrordelic Logo"
          className={styles.Logo}
          effect="blur"
        />
        {/* <div className={styles.iframeContainer}>
          <span className={styles.mainLinksText2}>
            <p>This is what we are about:</p>
          </span>
          <iframe
            width="360"
            height="215"
            src="https://www.youtube.com/embed/videoseries?controls=0&amp;list=PLNlcSeDBp29-_PCRyKMcQA1mcFzrZhv0d"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div> */}
        <div className={styles.mainLinks}>
          <span className={styles.mainLinksText}>
            <p>Visit our sites below:</p>
          </span>
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
