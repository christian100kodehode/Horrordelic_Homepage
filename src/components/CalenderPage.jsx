import React from "react";
import styles from "./CalenderPage.module.css";

function CalenderPage() {
  return (
    <div className={styles.containerBox}>
      <div className={styles.container}>
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FOslo&showTz=0&showCalendars=0&showTabs=0&title=Horrordelic%20Upcoming%3A%20Releases%20and%20Events&src=aG9ycm9yZGVsaWMucmVjb3Jkcy5jYWxlbmRlckBnbWFpbC5jb20&color=%23039BE5"
          // style="border:solid 1px #777"
          width="800"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="Horrordelic Release + Event calender"
        ></iframe>
      </div>
    </div>
  );
}

export default CalenderPage;
