import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ArtistDetail.module.css";
import { useParams } from "react-router-dom";

const ArtistDetail = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState({ name: {} });
  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  const [list, setList] = useState([]);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(
      async () => {
        const API_URL = `../artist-list.json`;
        const response = await axios.get(API_URL);
        setList(response.data);
        setIsLoading(false);
      }
      // 2000 - if wanting timeout
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(list);

  const params = useParams();
  console.log(params);
  {
    console.log(list.name);
  }

  return (
    <div className={styles.container}>
      <h1>{list.name}</h1>

      {list
        .filter((e) => e.name === params.id)
        .map(({ name }) => {
          return (
            <div key={id + name} className={styles.artistsContainer}>
              <h1>{id}</h1>
            </div>
          );
        })}
    </div>
  );
};

export default ArtistDetail;
