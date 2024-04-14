import styles from "./hero.module.css";
import Image from "next/image";


//used to dynamically set the content and styling of a hero section in a webpage

const Hero = ({ config }) => {
  return (
    <div className={styles.hero}>
      <Image
        className={styles.heroImage}
        src={config.backgroundImage}
        alt="Picture of the author"
        layout="fill"
        objectFit="cover"
      />

      <div className={styles.heroText}>
        <h1 style={{ color: config.headline.color }}>{config.headline.text}</h1>

        <div className={styles.body} style={{ color: config.underline.color }}>
          {config.underline.text}
        </div>
      </div>
    </div>
  );
};

export default Hero;