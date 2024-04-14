"use client";
import { useBasket } from "@/context/basket";
import styles from "./checkout.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Checkout = () => {
  const { basket, addToBasket, getProductsForBasket } =
    useBasket();

  const [basketItems, setBasketItems] = useState([]);
  const [productsFromBasket, setProductsFromBasket] = useState([]);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      let p = await getProductsForBasket();
      setProductsFromBasket(p);
    };

    getProducts();
    //if empty, will be only called once
  }, [getProductsForBasket]);

  const handleCheckout = async () => {
    try {
      const orderItems = basket.map((item) => ({
        id: item.id,
        amount: item.amount,
      }));

      console.log({ products: orderItems });

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: orderItems,
          email: email,
          created: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error in handleCheckout:", error);
    }
    router.push("/thankyou");
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkoutHeader}>
        {" "}
        <h1>Checkout</h1>
        <span>Please fill out the formular below.</span>
        <p>
          Continually productize compelling quality for packed with Elated
          Themes Setting up to website and it crating pages .
        </p>
      </div>

      {productsFromBasket.map((p) => {
        return (
          <div className={styles.products} key={p._id}>
            <Image src={p.imagePath} alt={p.title} width={300} height={300} />

            <h2>{p.title}</h2>
            <p>${p.price.toFixed(2)}</p>

            <div className={styles.addSubBtn}>
              <button onClick={() => addToBasket(p._id, -1)}>-</button>
              <span className={styles.amount}>{p.amount}</span>
              <button onClick={() => addToBasket(p._id, 1)}>+</button>
            </div>
          </div>
        );
      })}

      <div className={styles.checkoutSection}>
        <div className={styles.checkoutTotal}>
          {" "}
          <p>
            Total: $
            {productsFromBasket
              .reduce((total, p) => total + p.price * p.amount, 0)
              .toFixed(2)}
          </p>
        </div>
        <label>
          Enter Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
