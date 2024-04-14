"use client";

import styles from "./faq.module.css";
import { useState, useEffect } from "react";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [id, setId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
  };

  return (
    <div className={styles.container}>
      <h2>F.A.Qs</h2>
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
              <button onClick={(e) => handleDelete(e, faq._id)}>Delete</button>
            </span>
          );
        })}
      </div>

      <h3>Add New</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Question?
          <input type="question" name="question" defaultValue={""} />
        </label>

        <label>
          Answer
          <textarea type="answer" name="answer" defaultValue={""} />
        </label>

        <button>Upload</button>
      </form>

      <h3>Update</h3>

      <form className={styles.form} onSubmit={handleUpdate}>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>

        <label>
          Question:
          <input
            type="text"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>

        <label>
          Answer:
          <textarea
            type="text"
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>

        <button>Update</button>
      </form>
    </div>
  );
};

export default Faqs;
