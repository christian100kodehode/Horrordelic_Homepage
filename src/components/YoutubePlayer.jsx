import YouTube from "react-youtube";
import styles from "./Release.module.css";

const YoutubePlayer = ({ setHasLoaded, videoId, id }) => {
  const _onReady = (event) => {
    event.target.playVideo();
  };

  // Option added for using nocookie
  const opts = {
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      autoplay: 0,
      rel: 0,           // Ikke vis anbefalte videoer fra andre kanaler
      showinfo: 0,      // Skjul videotittel før avspilling
      ecver: 2          // Tvinger nyere, mer personvernvennlig håndtering i eldre nettlesere
    },
  };

  return <YouTube videoId={videoId}  opts={opts} onReady={_onReady} className={styles.videoInner} iframeClassName={styles.videoInner} />;
};

export default YoutubePlayer;
