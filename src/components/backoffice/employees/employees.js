"use client";
import { useEffect, useState } from "react";
import styles from "./employees.module.css";
import Image from "next/image";
import employeesData from "../../../data/employees.json";
import ModalNew from "../modals/modalEmployees/new/modal";
import ModalUpdate from "../modals/modalEmployees/update/modal";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");

  const getEmployees = () => {
    setEmployees(employeesData);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    console.log("Updating employee:", { name, description, position });

    setModalIsOpen(false);
  };

  const handleCreate = () => {
    setModalIsOpen(true);
  };



  const closeModal = () => {
    setModalIsOpen(false);
    setUpdateModalIsOpen(false);
  };

  const handleEdit = (employee) => {
    setId(employee._id);
    setName(employee.name);
    setDescription(employee.description);
    setPosition(employee.position);
    setUpdateModalIsOpen(true);
  };

  /* ORIGINAL
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
  }; */

  return (
    <div className={styles.container}>
      <button className={styles.newBtn} onClick={handleCreate}>
        Create New
      </button>
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
              <p>
                <b>{employee.name}</b>
              </p>
              <p>{employee.description}</p>

              <p>
                <b>{employee.position}</b>
              </p>
              <div className={styles.actionBtn}>
                {" "}
               
                <button onClick={() => handleEdit(employee)}>Edit</button>
                <button>
                  Delete
                </button>
              </div>
            </span>
          );
        })}
      </div>

      <ModalNew
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        name={name}
        description={description}
        position={position}
        handleUpdate={handleUpdate}
        setName={setName}
        setDescription={setDescription}
        setPosition={setPosition}
      />

      <ModalUpdate
        modalIsOpen={updateModalIsOpen}
        closeModal={closeModal}
        id={id}
        name={name}
        description={description}
        position={position}
        handleUpdate={handleUpdate}
        setName={setName}
        setDescription={setDescription}
        setPosition={setPosition}
      />
    </div>
  );
};

export default Employees;
