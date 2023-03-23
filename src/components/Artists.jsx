import React from "react";
import styles from "./Artists.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Artists = () => {
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // State for Release data
  const [artist, setArtist] = useState([]);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(
      async () => {
        const API_URL = `./artist-list.json`;
        const response = await axios.get(API_URL);
        setArtist(response.data);
        setIsLoading(false);
      }
      // 2000 - if wanting timeout
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(artist);
  return (
    <main className={styles.container}>
      <div className={styles.artistList}>
        <div className={styles.categoryHeader}>
          <h2>Artists</h2>
        </div>
        {artist
          .filter((e) => e.category === "artist")
          .map(({ name, id, land }) => {
            return (
              <div key={id} className={styles.artistsContainer}>
                <Link to={`/artist/${name}`}>
                  <LazyLoadImage
                    className={styles.thumbNailImage}
                    src={"./artists/" + name.replace(/ /g, "") + ".jpg"}
                    height={"40vh"}
                    width={"40vh"}
                    alt={name}
                    title={name}
                    effect="blur"
                    placeholderSrc={"./artists/ArtistPlaceholder.jpg"}
                  />
                  <h2 className={styles.artistHeader} style={name.length > 13 ? { fontSize: "1.2em" } : { fontSize: "1.5em" }}>
                    {name}
                  </h2>
                </Link>
              </div>
            );
          })}
      </div>
      <div className={styles.artistList}>
        <div className={styles.categoryHeader}>
          <h2>Djs</h2>
        </div>
        {artist
          .filter((e) => e.category === "dj")
          .map(({ name, id, land }) => {
            return (
              <div key={id} className={styles.artistsContainer}>
                <Link to={`/artist/${name}`}>
                  <LazyLoadImage
                    className={styles.thumbNailImage}
                    // Remove space in name, picture have to have to have no spaces
                    src={"./artists/" + name.replace(/ /g, "") + ".jpg"}
                    height={"40vh"}
                    width={"40vh"}
                    alt={name}
                    title={name}
                    effect="blur"
                    placeholderSrc={"./artists/ArtistPlaceholder.jpg"}
                  />

                  <h2 className={styles.artistHeader} style={name.length > 13 ? { fontSize: "1.2em" } : { fontSize: "1.5em" }}>
                    {name}
                  </h2>
                  <span className={styles.land}>{land}</span>
                </Link>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default Artists;
