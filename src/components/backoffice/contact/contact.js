"use client";

import { useState, useEffect } from "react";
import styles from "./contact.module.css";


const Contact = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const response = await fetch("http://localhost:3000/api/contacts");
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    getMessages();
  }, []);

  //CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, phone, message } = e.target.elements;

      if (!name.value || !message.value || !email.value) {
        console.log("You need a name, message and an email!");
        return;
      }


      let contact = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
      };

      let response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      // console.log(contact);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      getMessages();
      e.target.reset();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }

  };

  //DELETE
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/contact?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    set
    getMessages();
  };

  return (
    <div className={styles.container}>
      {messages.map((message, index) => (
        <div key={index} className={styles.contact}>
          <h2>{message.name}</h2>
          <p>
            <b>Email:</b> {message.email}
          </p>
          <p>
            <b>Phone:</b> {message.phone}
          </p>
          <p>
            <b>Message:</b> {message.message}
          </p>
          <button onClick={() => handleDelete(message._id)}>Delete</button>
          <hr />
        </div>
      ))}

      <h3>Add New</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          {" "}
          Name
          <input type="text" name="name" defaultValue={""} />
        </label>
        <label>
          {" "}
          Email
          <input type="text" name="email" defaultValue={""} />
        </label>
        <label>
          {" "}
          Phone
          <input type="text" name="phone" defaultValue={""} />
        </label>
        <label>
          {" "}
          Message
          <textarea type="text" name="message" defaultValue={""} />
        </label>

        <button>Upload</button>
      </form>
    </div>
  );
};

export default Contact;
