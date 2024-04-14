"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./services.module.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.servicesHeader}>
        <h1>The Leader of all Milk</h1>
        <span>Safe and Healthy Milk Since 1975</span>
      </div>

      <div className={styles.serviceContainer}>
        {services.map((service) => (
          <div className={styles.serviceWrapper} key={service._id}>
            <Image
              className={styles.serviceImage}
              src={service.imagePath}
              alt={service.title}
              width={800}
              height={700}
            />
            <h2>{service.title}</h2>
            <span>
              <b>{service.byline}</b>
            </span>
            <p>{service.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
