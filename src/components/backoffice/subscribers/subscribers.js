"use client";
import { useEffect, useState } from "react";
import styles from "./subscribers.module.css";
import subscriberData from "../../../data/subscribers.json";
import ModalNew from "../modals/modalSubs/new/newModal";
import ModalUpdate from "../modals/modalSubs/update/modal";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const getSubscribers = () => {
    setSubscribers(subscriberData);
  };

  useEffect(() => {
    getSubscribers();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
    setValidated(false);
    setCreateModalIsOpen(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setValidated(false);
    setEditModalIsOpen(false);
  };

  /* original
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
  }; */

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {" "}
        <h2>Edit Subscribers</h2>
        <button onClick={() => setCreateModalIsOpen(true)}>Create New Subscriber</button>
      </div>

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

                <td className={styles.actions}>
                  {/* <button onClick={(e) => handleDelete(e, subscriber._id)}>
                    Delete
                  </button> */}

                  <button
                    onClick={() => {
                      setEditModalIsOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

     

      <ModalNew
        modalIsOpen={createModalIsOpen}
        closeModal={() => setCreateModalIsOpen(false)}
        name={name}
        email={email}
        message={message}
        validated={validated}
        handleCreate={handleCreate}
        setName={setName}
        setEmail={setEmail}
        setMessage={setMessage}
        setValidated={setValidated}
      />

      <ModalUpdate
        modalIsOpen={editModalIsOpen}
        closeModal={() => setEditModalIsOpen(false)}
        id={id}
        name={name}
        email={email}
        message={message}
        validated={validated}
        handleUpdate={handleUpdate}
        setId={setId}
        setName={setName}
        setEmail={setEmail}
        setMessage={setMessage}
        setValidated={setValidated}
      />
    </div>
  );
};

export default Subscribers;
