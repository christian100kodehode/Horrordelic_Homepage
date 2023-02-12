import styles from "./Main.module.css";
import HorrordelicLogo from "../images/horrordelic.jpg";

const Main = () => {
  return (
    <main className={styles.Main}>
      <img src={HorrordelicLogo} alt="Horrordelic Logo" className={styles.Logo} />
    </main>
  );
};

export default Main;
