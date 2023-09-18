import React from "react";
import styles from "./ReleaseAndEvents.module.css";
// import axios from "axios";
// import { useState, useEffect } from "react";
import CalenderPage from "./CalenderPage";

const ReleaseAndEvents = () => {
  // State for loading
  // const [isLoading, setIsLoading] = useState(false);
  // State for Release data
  // const [artist, setArtist] = useState([]);

  // const fetchData = () => {
  //   setIsLoading(true);
  //   setTimeout(
  //     async () => {
  //       const API_URL = `./artist-list.json`;
  //       const response = await axios.get(API_URL);
  //       setArtist(response.data);
  //       setIsLoading(false);

  //       // Old version:
  //       // Get the URL and add the hash then scrollintoView on load
  //       // let a = new URL(window.location.href);
  //       // document.querySelector(a.hash).scrollIntoView();
  //       // console.log(a.hash);
  //     }
  //     // 2000 - if wanting timeout
  //   );
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // const imagePaths = [];
  // //          note relative path vvv                 vvv this gets rid of promises
  // Object.values(import.meta.glob("../*.jpg", { eager: true })).forEach(
  //   ({ default: path }) => {
  //     const url = new URL(path, import.meta.url);
  //     const data = {
  //       path: url.pathname,
  //     };
  //     console.log(data);
  //     imagePaths.push(data);
  //   }
  // );
  // console.log(imagePaths);

  return (
    <div className={styles.container}>
      <h1>Check the upcoming release scheduele and events here ...</h1>
      <CalenderPage />
    </div>
  );
};

export default ReleaseAndEvents;
