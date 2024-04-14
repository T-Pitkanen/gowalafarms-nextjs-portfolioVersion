"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./articleServices.module.css";
import { IoMdCheckboxOutline } from "react-icons/io";

const ArticleServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/articles?category=services")
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className={styles.container}>
      {" "}
      {services.map((service, index) => (
          <div 
          // check if the index is odd or even and add a class to reverse the order of the elements
          className={`${styles.servicesWrapper} ${index % 2 !== 0 ? styles.servicesWrapperReverse : ''}`} 
          key={service._id}
        >
          <Image
            src={service.imagePath}
            alt={service.title}
            width={500}
            height={500}
          />
          <div className={styles.servicesText}>
            {" "}
            <h1>{service.title}</h1>
            <p>{service.body}</p>
            <ul className={styles.servicesList}>
              {service.checklist.map((item, index) => (
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

export default ArticleServices;
