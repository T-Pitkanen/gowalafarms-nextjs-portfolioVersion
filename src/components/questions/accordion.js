"use client";
import styles from "./accordions.module.css";
import { useState } from "react";
import { FaAngleDown, FaAngleUp  } from "react-icons/fa";

const Accordion = ({ header, body }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`${styles.accordion} ${isActive ? styles.active : ""}`}>
      <div className={styles.body}>
        <h2 onClick={() => setIsActive(!isActive)}>
      
          {header}
          {isActive ? (
            <FaAngleUp className={styles.icon} />
          ) : (
            <FaAngleDown className={styles.icon} />
          )}
        </h2>

        <div
          className={`${styles.textblock}`}
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
    </div>
  );
};

export default Accordion;
