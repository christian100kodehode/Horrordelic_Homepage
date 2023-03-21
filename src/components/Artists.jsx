import React from "react";
import styles from "./Artists.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className={styles.container}>
      {artist.map(({ name, id }) => {
        return (
          <div key={id} className={styles.artistsContainer}>
            <h2>
              <Link to={`/artist/${name}`}>{name}</Link>
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default Artists;
