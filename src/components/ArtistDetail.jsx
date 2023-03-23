import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ArtistDetail.module.css";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
// Importing images
import youtubeLogo from "../images/youtubeLogo.png";

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
    <main className={styles.container}>
      {list
        .filter((e) => e.name === params.id)
        .map(({ name, category, id, headerInfo, artists_text, soundcloud, facebook }) => {
          return (
            <div key={id + name} className={styles.artistsContainer}>
              <div className={styles.imageContainer}>
                <LazyLoadImage
                  className={styles.headerImage}
                  src={"../artists/" + name.replace(/ /g, "") + "Banner" + ".jpg"}
                  alt={name}
                  title={name}
                  effect="blur"
                  placeholderSrc={"../artists/ArtistPlaceholder.jpg"}
                />
              </div>
              <div className={styles.artistHeader}>
                <h1>{name}</h1>
                <h2>
                  {headerInfo ? headerInfo.toLowerCase() + "," : ""} {category.toLowerCase()}
                </h2>
              </div>
              <div className={styles.artistText}>
                <h2>{artists_text}</h2>
              </div>
              <a href={"https://www.youtube.com/results?search_query=" + category + "+" + name + "&sp=CAI%253D"} target="_blank" rel="noreferrer">
                <img src={youtubeLogo} alt="Youtube Link" title={name + " latest Youtube videos..."} />
              </a>
            </div>
          );
        })}
    </main>
  );
};

export default ArtistDetail;
