import React from 'react';
import styles from './YouTubePlaylistEmbed.module.css'; // Import CSS module

const YouTubePlaylistEmbed = ({ playlistId, width = '320', height = '180' }) => {
  return (
    <div className={styles.youtubeContainer}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`}
        title="YouTube Playlist"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlaylistEmbed;