"use client";

import Accordion from "./accordion";
import { useEffect, useState } from "react";
import styles from "./accordions.module.css";

const Faqs = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch("api/faqs");
      const data = await response.json();
      setQuestionsData(data);
      setLoading(false);
    };

    getQuestions();
  }, []);



  return (
    <div className={styles.accordionsContainer} id="faq">
      <div className={styles.accordions}>
        {" "}
        {questionsData.map((question) => {
          return (
            <Accordion
              key={question._id}
              header={question.question}
              body={question.answer}
            ></Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Faqs;
