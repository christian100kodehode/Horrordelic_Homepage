// Import CSS
import styles from "./Main.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
// Import images
import HorrordelicLogo from "../images/horrordelic.jpg";
// Import Components/Hooks
import { LazyLoadImage } from "react-lazy-load-image-component";

const Main = () => {
  return (
    <main className={styles.Main}>
      <LazyLoadImage src={HorrordelicLogo} alt="Horrordelic Logo" className={styles.Logo} effect="blur" />
    </main>
  );
};

export default Main;
