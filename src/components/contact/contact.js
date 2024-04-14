"use client";

import { useState } from "react";
import * as Yup from "yup";
import styles from "./contact.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone Number is required"),
    message: Yup.string().required("Type a message to send"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      schema.validateSync(
        {
          name: name,
          email: email,
          phone: phone,
          message: message,
        },
        { abortEarly: false }
      );

      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          message: message,
        }),
      });

      const data = await response.json();
      console.log(data);

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      setSuccessMessage("Thank You for your message!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          switch (err.path) {
            case "name":
              setNameError(err.message);
              break;
            case "email":
              setEmailError(err.message);
              break;
            case "phone":
              setPhoneError(err.message);
              break;
            case "message":
              setMessageError(err.message);
              break;
            default:
              break;
          }
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Send a message to us</h1>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
          />
          {nameError && <p className={styles.errorMessage}>{nameError}</p>}
        </label>
        <label>
         
          <input
            type="email"
            placeholder="Your E-Mail"
            value={email}
            onChange={(e) => {
              setName(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <p className={styles.errorMessage}>{emailError}</p>}
        </label>
        <label>
          
          <input
            type="tel"
            value={phone}
            placeholder="Phone Number"
            onChange={(e) => {
              setName(e.target.value);
              setPhoneError("");
            }}
          />
          {phoneError && <p className={styles.errorMessage}>{phoneError}</p>}
        </label>
        <label>
       
          <textarea
            value={message}
            placeholder="Your message"
            onChange={(e) => {
              setName(e.target.value);
              setMessageError("");
            }}
          />
          {messageError && (
            <p className={styles.errorMessage}>{messageError}</p>
          )}
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
