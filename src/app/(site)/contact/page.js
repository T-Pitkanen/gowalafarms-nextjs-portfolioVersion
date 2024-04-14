import styles from "./page.module.css";
import Hero from "@/components/hero/hero";
import Contact from "@/components/contact/contact";
import Team from "@/components/team/team";
import QuickContact from "@/components/quickContact/quickContact";

export default function ContactPage() {
  const heroConfig = {
    headline: {
      text: "Contact Gowala Farms",
      color: "black",
    },
    backgroundImage: "/headers/page_header_01.jpg",
    underline: {
      text: ` Get in touch with us
				`,
      color: "#5D9913",
    },
  };
  return (
    <div className={styles.page}>
      <Hero config={heroConfig} />
      <div className={styles.contacts}>
        {" "}
        <Contact />
        <QuickContact />
      </div>

      <div className={styles.contact}>
        <h1>Our Team</h1>
        <h2>2000+ People work since 1975</h2>
        <p>
          Continually productize compelling quality for packed with Elated
          Themes Setting up to website and it crating pages .
        </p>
      </div>

      <Team />
    </div>
  );
}
