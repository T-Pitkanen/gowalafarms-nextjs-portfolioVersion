"use client";

import { FaList } from "react-icons/fa6";
import { IoMdGrid } from "react-icons/io";


import { useEffect, useState } from "react";
import styles from "./products.module.css";
import Product from "./product/product";

const Products = ({ exclusive }) => {
  const [products, setProducts] = useState([]);
  const [isExclusive, setIsExclusive] = useState(exclusive);

  const [view, setView] = useState("card");

  const showAllProducts = () => {
    return products.length !== 0
      ? products.map((product, index) => (
          <div key={index} className={styles.product}>
            <Product key={index} product={product} view={view}></Product>
          </div>
        ))
      : null;
  };

  const showExclusiveProducts = () => {
    return products.length !== 0
      ? products
          .filter((p) => p.exclusive)
          .slice(0, 4)
          .map((product, index) => (
            <div key={index} className={styles.product}>
              <Product product={product} view={view}></Product>
            </div>
          ))
      : null;
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    setIsExclusive(exclusive);
  }, [exclusive]);

  return (
    <div className={styles.products} id="selected">
      <div className={styles.productBtns}>
        {" "}
        <button onClick={() => setView("card")}>
          <IoMdGrid style={{ color: view === "card" ? "green" : "black" }} />
        </button>
        <button onClick={() => setView("list")}>
          <FaList style={{ color: view === "list" ? "green" : "black" }} />
        </button>
      </div>

      <div className={styles.list}>
        {isExclusive ? showExclusiveProducts() : showAllProducts()}
      </div>
    </div>
  );
};

export default Products;
