import styles from "./page.module.css";
import Hero from "@/components/hero/hero";
import Products from "@/components/products/products";

export default function ShopPage() {
  const heroConfig = {
    headline: {
      text: "Gowala Shopping",
      color: "black",
    },
    backgroundImage: "/headers/page_header_01.jpg",
    underline: {
      text: ` We are grateful for your contribution.
				`,
      color: "#5D9913",
    },
  };

  return (
    <div className={styles.page}>
      <Hero config={heroConfig} />
      <div className={styles.products}>
        {" "}
        <h1>All our products</h1>
        <h2>Everything in one place</h2>
        <p>
          Continually productize compelling quality for packed with Elated
          Themes Setting up to website and it crating pages .
        </p>
      </div>

      <Products />
    </div>
  );
}
