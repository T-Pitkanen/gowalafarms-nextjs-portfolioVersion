"use client";

import styles from "./faq.module.css";
import { useState, useEffect } from "react";
import faqData from "../../../data/faq.json";
import ModalFaq from "../modals/modalFaq/modal";
import ModalFaqNew from "../modals/modalFaq/newModal";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [id, setId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);


  const handleCreateOpen = () => {
    setQuestion("");
    setAnswer("");
    setCreateModalIsOpen(true);
  };

  const handleEdit = (faq) => {
    setId(faq._id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditModalIsOpen(true);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    setQuestion("");
    setAnswer("");
    setCreateModalIsOpen(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setCreateModalIsOpen(false);
  };

  const getFaqs = () => {
    setFaqs(faqData);
  };

  useEffect(() => {
    getFaqs();
  }, []);


   /* ORIGINAL
  const getFaqs = async () => {
    const response = await fetch("http://localhost:3000/api/faqs");
    const data = await response.json();
    setFaqs(data);
  };

  useEffect(() => {
    getFaqs();
  }, []);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { question, answer } = e.target.elements;

    if (!question.value || !answer.value) {
      console.log("You need to add a question and an answer!");
      return;
    }

    const formData = new FormData();
    formData.append("question", question.value);
    formData.append("answer", answer.value);

    let response = await fetch("http://localhost:3000/api/faq", {
      method: "POST",
      body: formData,
    });

    let data = await response.json();

    getFaqs();
  };


  //DELETE
  const handleDelete = async (e, id) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/api/faq?id=" + id, {
      method: "DELETE",
    });
    let data = await response.json();

    getFaqs();
  };


  //UPDATE
  const handleUpdate = async (event) => {
    event.preventDefault();

    const question = event.target.question.value;
    const answer = event.target.answer.value;

    const response = await fetch(`http://localhost:3000/api/faq?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        question: question,
        answer: answer,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    getFaqs();

    setId("");
    setQuestion("");
    setAnswer("");
  }; */

  return (
    <div className={styles.container}>
      <div className={styles.faqHeader}>
        {" "}
       <button onClick={handleCreateOpen}>Create New</button>
      </div>

      <div className={styles.faq}>
        {faqs.map((faq, index) => {
          return (
            <span className={styles.faqContainer} key={index}>
              <p>
                <b>ID:</b> {faq._id}
              </p>
              <p>
                <b>{faq.question}</b>
              </p>
              <p>{faq.answer}</p>
              <button onClick={() => handleEdit(faq)}>Edit</button>
              <button onClick={(e) => handleDelete(e, faq._id)}>Delete</button>
              
            </span>
          );
        })}
      </div>
      <ModalFaqNew
        modalIsOpen={createModalIsOpen}
        closeModal={() => setCreateModalIsOpen(false)}
        id={""}
        question={question}
        answer={answer}
        handleCreate={handleCreate}
        setQuestion={setQuestion}
        setAnswer={setAnswer}
      />

      <ModalFaq
        modalIsOpen={editModalIsOpen}
        closeModal={() => setEditModalIsOpen(false)}
        id={id}
        question={question}
        answer={answer}
        handleUpdate={handleUpdate}
        setQuestion={setQuestion}
        setAnswer={setAnswer}
      />
    </div>
  );
};

export default Faqs;

