import { useCookieConsent } from "react-cookie-manager";
import styles from './YouTubePlaylistEmbed.module.css';

const YouTubePlaylistEmbed = ({ playlistId, width = '320', height = '180' }) => {
  const { showConsentBanner,  detailedConsent } = useCookieConsent();

  
  // Check consent — adjust category name if you customized it (e.g., Social, Advertising, or a custom "Embeds")
  // YouTube embeds typically fall under Social or Advertising
  const hasConsent = detailedConsent?.Analytics?.consented || detailedConsent?.Advertising?.consented || false;

  if (!hasConsent) {
    return (
      <div className={styles.placeholder}>
        
  {/*       <p>To view this YouTube playlist, please accept Social or Advertising cookies.</p> */}
{/*   <CookieManager
  translations={{
          title: "Youtube and Google Cookies 🍪",
          message:
          "We value your privacy, but Youtube/Google will go ahead with their cookies. Accept to save and play as normal.",
          buttonText: "Accept All",
          declineButtonText: "Decline All",
      }} 
  showManageButton={false}
  enableFloatingButton={true} > </CookieManager> */}
        {/* Optional: button to reopen banner/preferences if you enable manage button */}
  <button onClick={showConsentBanner}>Manage Cookie Settings</button>
      </div>
    );
  }

  return (
    <div className={styles.youtubeContainer}>

      <div className={styles.leftvideoBox}>
                  <p style={{ fontSize: "2rem" }}>Latest videos:</p>
                </div>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`}
        title="YouTube Playlist"
      /*   "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" */
        /* allow-FullScreen */
      />

    </div>
  );
};

export default YouTubePlaylistEmbed;