"use client";

import { useEffect, useState } from "react";
import styles from "./team.module.css";
import Image from "next/image";
import ContentLoader from "react-content-loader";
import { FaAngleUp, FaAngleDown  } from "react-icons/fa6";


const Team = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEmployeeId, setExpandedEmployeeId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <ContentLoader
        speed={2}
        width={300}
        height={300}
        viewBox="0 0 300 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="5" ry="5" width="300" height="300" />
      </ContentLoader>
    );
  }

  return (
    <div className={styles.container}>
      {employees.map((employee) => (
        <div key={employee._id} className={styles.card}>
          <Image
            src={employee.imagePath}
            alt={employee.name}
            width={500}
            height={500}
          />

          
          <div
            className={styles.overlay}
          // check if the employee is expanded, with id,  and toggle the expanded state
            onClick={() =>
              setExpandedEmployeeId((prevId) =>
                prevId === employee._id ? null : employee._id
              )
            }
          >
            <h2>
              {employee.name}{" "}
              {expandedEmployeeId === employee._id ? (
                <span ><FaAngleDown className={styles.overlayIcon} /></span>
              ) : (
                <span><FaAngleUp className={styles.overlayIcon} /></span>
              )}
            </h2>
            {expandedEmployeeId === employee._id && (
              <>
                <h3>{employee.position}</h3>
                <p>{employee.description}</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;
