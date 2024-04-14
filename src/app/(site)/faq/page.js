import styles from "./page.module.css";
import Hero from "@/components/hero/hero";
import Contact from "@/components/contact/contact";
import Faqs from "@/components/questions/accordions";




export default function FaqPage() {
  const heroConfig = {
    headline: {
      text: "Questions? ",
      color: "black",
    },
    backgroundImage: "/headers/page_header_01.jpg",
    underline: {
      text: ` We might have the answers you're looking for
				`,
      color: "#5D9913",
    },
  };
  return (
    <div className={styles.page}>
      <Hero config={heroConfig} />
      <Contact/>
     
      <div className={styles.faq}>
        <h1>Frequently Asked Questions</h1>
        <p>
          Continually productize compelling quality for packed with Elated
          Themes Setting up to website and it crating pages .
        </p>
      </div>
      <Faqs/>

      
    </div>
  );
}
