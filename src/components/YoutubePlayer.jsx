import YouTube from "react-youtube";
import styles from "./Release.module.css";

const YoutubePlayer = ({ setHasLoaded, videoId, id }) => {
  const _onReady = (event) => {
    event.target.playVideo();
  };

  return <YouTube videoId={videoId} onReady={_onReady} className={styles.videoInner} iframeClassName={styles.videoInner} />;
};

export default YoutubePlayer;
