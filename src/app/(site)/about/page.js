import styles from "./page.module.css";
import Hero from "@/components/hero/hero";
import About from "@/components/about/about";
import Partners from "@/components/partners/partners";
import Services from "@/components/services/services";

export default function AboutPage() {
  const heroConfig = {
    headline: {
      text: "About Gowala Farms",
      color: "black",
    },
    backgroundImage: "/headers/page_header_01.jpg",
    underline: {
      text: ` Our story & mission `,
      color: "#5D9913",
    },
  };

  return (
    <div className={styles.page}>
      <Hero config={heroConfig} />
      <About />

      <div className={styles.partners}>
        <h2>Our Proud Partners</h2>
        <h3>We gladly present</h3>
        <p>
          Continually productize compelling quality for packed with Elated
          Themes Setting up to website and it crating pages .
        </p>
      </div>
      <Partners />
      <Services />
    </div>
  );
}
