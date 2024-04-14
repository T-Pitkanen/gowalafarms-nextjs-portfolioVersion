"use client";
import { useEffect, useState } from "react";
import styles from "./employees.module.css";
import Image from "next/image";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    const response = await fetch("http://localhost:3000/api/employees");
    const data = await response.json();
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, []);


  //CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, position, description, file } = e.target.elements;

    if (
      !name.value ||
      !position.value ||
      !description.value ||
      !file.files[0]
    ) {
      console.log("You need to add a file, name, description and position!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("position", text.value);
    formData.append("description", description.value);
    formData.append("file", file.files[0]);

    let response = await fetch("http://localhost:3000/api/employee", {
      method: "POST",
      body: formData,
    });

    let data = await response.json();

    getEmployees();
  };


  //DELETE
  const handleDelete = async (e, id) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/api/employee?id=" + id, {
      method: "DELETE",
    });
    let data = await response.json();

    getEmployees();
  };

  //UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { id, name, position, description, file } = e.target.elements;

      const formData = new FormData();
      formData.append("id", id.value);
      formData.append("name", name.value);
      formData.append("position", position.value);
      formData.append("description", description.value);
      formData.append("file", file.files[0]);

      if (!id.value) {
        console.log("You need to add an ID!");
        return;
      }

      let response = await fetch(
        `http://localhost:3000/api/employee?id=${id.value}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      getEmployees();
      e.target.reset();
    } catch (error) {
      console.error("Error in handleUpdate:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.employees}>
        {employees.map((employee, index) => {
          return (
            <span className={styles.employeesContainer} key={index}>
              <Image
                className={styles.employeesImg}
                src={employee.imagePath}
                alt={employee.title}
                width={500}
                height={500}
              />
              <p>{employee._id}</p>
              <p>
                
                <b>{employee.name}</b>
              </p>
              <p>{employee.description}</p>

              <p>
                <b>{employee.position}</b>
              </p>
              <button onClick={(e) => handleDelete(e, employee._id)}>
                Delete
              </button>
            </span>
          );
        })}
      </div>

      <h3>Add New</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          {" "}
          Name
          <input type="name" name="name" defaultValue={""} />
        </label>
        <label>
          {" "}
          Position
          <input type="position" name="position" defaultValue={""} />
        </label>
        <label>
          {" "}
          Description
          <textarea type="text" name="description" defaultValue={""} />
        </label>
        <label>
          {" "}
          Employee Image
          <input type="file" name="file" placeholder="Select File" />
        </label>
        <button>Upload</button>
      </form>

      <h3>Update</h3>

      <form className={styles.form} onSubmit={handleUpdate}>
        <label>
          ID:
          <input type="text" name="id" defaultValue={""} />
        </label>
        <label>
          Name:
          <input type="text" name="name" defaultValue={""} />
        </label>
        <label>
          Position:
          <input type="text" name="position" defaultValue={""} />
        </label>
        <label>
          {" "}
          Description
          <textarea type="text" name="description" defaultValue={""} />
        </label>

        <label>
          {" "}
          Employee Image
          <input type="file" name="file" placeholder="Select File" />
        </label>

        <button>Update</button>
      </form>
    </div>
  );
};

export default Employees;
