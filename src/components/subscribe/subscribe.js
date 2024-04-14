"use client";

import { useState } from "react";
import styles from "./subscribe.module.css";

const Subscribe = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Check your email address!");
      return;
    }

    setEmail(email);
    setShowModal(true);

    try {
      const response = await fetch("http://localhost:3000/api/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      setSubmittedEmail(email);
      setEmail("");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h3>Subscribe</h3>
          <span>Get news about next dairy products</span>
          <p>
            Continually productize compelling quality for packed with Elated
            Themes Setting up to website and it crating pages .
          </p>
         
        </div>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <button className={styles.submit} type="submit">
            Subscribe
          </button>
        </form>

        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContainer}>
              <button
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                X
              </button>
              <h1 className={styles.modalHeader}>Thank You!</h1>
              <span className={styles.subName}>{submittedEmail}</span>
              <h2>What is your favorite?</h2>
              <p>Continually productize compelling quality for packed with Elated Themes Setting up to website and it crating pages .</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
