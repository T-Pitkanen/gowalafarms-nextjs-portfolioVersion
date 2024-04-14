"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./about.module.css";
import { IoMdCheckboxOutline } from "react-icons/io";

const About = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/articles?category=about")
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div className={styles.container}>
      {articles.map((article) => (
        <div className={styles.aboutWrapper} key={article._id}>
          <Image
            src={article.imagePath}
            alt={article.title}
            width={500}
            height={300}
          />
          <div className={styles.aboutText}>
            {" "}
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <ul className={styles.aboutList}>
              {article.checklist.map((item, index) => (
                <li key={index}>
                  <IoMdCheckboxOutline className={styles.icon} />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
