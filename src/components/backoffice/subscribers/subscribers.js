"use client";
import { useEffect, useState } from "react";
import styles from "./subscribers.module.css";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  //READ
  const getSubscribers = async () => {
    const response = await fetch("http://localhost:3000/api/subscribers");
    const data = await response.json();
    setSubscribers(data);
  };

  useEffect(() => {
    getSubscribers();
  }, []);

  //CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, message, validated } = e.target.elements;

      if (!name.value || !email.value) {
        console.log("You need to add a name, email, and message!");
        return;
      }

      let subscriber = {
        name: name.value,
        email: email.value,
        validated: validated.checked,
        message: message.value,
      };

      let response = await fetch("http://localhost:3000/api/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriber),
      });

      console.log(subscriber);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      getSubscribers();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  //UPDATE
  const handleUpdate = async (e) => {
	e.preventDefault();
  
	try {
	  const { id, name, email, message, validated } = e.target.elements;
  
	  if (!id.value ) {
		console.log("You need to add an ID!");
		return;
	  }
  
	  let response = await fetch(
		`http://localhost:3000/api/subscriber?id=${id.value}`,
		{
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			id: id.value,
			name: name.value,
			email: email.value,
			message: message.value,
			validated: validated.checked
		  }),
		}
	  );
  
  
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
  
	  let data = await response.json();
  
	  getSubscribers();
	  e.target.reset();
	} catch (error) {
	  console.error("Error in handleUpdate:", error);
	}
  };

  //DELETE
  const handleDelete = async (e, id) => {
    e.preventDefault();
    let response = await fetch(
      "http://localhost:3000/api/subscriber?id=" + id,
      {
        method: "DELETE",
      }
    );
    let data = await response.json();

    getSubscribers();
  };

  return (
    <div className={styles.container}>
      <h2>Subscribers</h2>
      <table className={styles.subscribersTable}>
        <thead>
          <tr>
		  <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Validated?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, index) => {
            return (
              <tr key={index}>
                <td>{subscriber._id}</td>
                <td>{subscriber.name}</td>
                <td>{subscriber.email}</td>
                <td>{subscriber.message}</td>
                <td>{subscriber.validated ? "Yes" : "No"}</td>

                <td>
                  <button onClick={(e) => handleDelete(e, subscriber._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Add New</h3>

      <form className={styles.subForm} onSubmit={handleSubmit}>
        <label>
          {" "}
          Name
          <input
            type="name"
            name="name"
            placeholder="Enter Name"
            defaultValue={""}
          />
        </label>
        <label>
          {" "}
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            defaultValue={""}
          />
        </label>

		
       
        <label>
          {" "}
          Text
          <textarea
            type="message"
            name="message"
            placeholder="Enter Message"
            defaultValue={""}
          />
        </label>

		<label>
          Validated:
          <input type="checkbox" name="validated" />
        </label>

        <button>Add New Subscriber</button>
      </form>

      <h3>Update</h3>

      <form className={styles.subForm} onSubmit={handleUpdate}>
        <label>
          ID:
          <input
            type="text"
            name="id"
            placeholder="Enter ID"
            defaultValue={""}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            defaultValue={""}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            defaultValue={""}
          />
        </label>
		<label>
          {" "}
          Message
          <textarea
            type="text"
            name="message"
            placeholder="Enter Message"
            defaultValue={""}
          />
        </label>
        <label>
          Validated:
          <input type="checkbox" name="validated" />
        </label>

        <button>Update</button>
      </form>
    </div>
  );
};

export default Subscribers;
