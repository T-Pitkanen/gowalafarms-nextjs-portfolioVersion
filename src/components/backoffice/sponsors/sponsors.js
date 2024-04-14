"use client";
import { useEffect, useState } from "react";
import styles from "./sponsors.module.css";
import Image from "next/image";
import Link from "next/link";

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  const getSponsors = async () => {
    const response = await fetch("http://localhost:3000/api/sponsors");
    const data = await response.json();
    setSponsors(data);
  };

  useEffect(() => {
    getSponsors();
  }, []);

  //CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, file, link } = e.target.elements;

    if (!name.value || !file.files[0]) {
      console.log("You need a title and a file!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("link", link.value);
    formData.append("file", file.files[0]);

    let response = await fetch("http://localhost:3000/api/sponsor", {
      method: "POST",
      body: formData,
    });

    let data = await response.json();

    getSponsors();
  };

  //DELETE
  const handleDelete = async (e, id) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/api/sponsor?id=" + id, {
      method: "DELETE",
    });
    let data = await response.json();

    getSponsors();
  };

  return (
    <div className={styles.container}>
      {sponsors.map((sponsor, index) => {
        return (
          <span className={styles.sponsorContainer} key={index}>
            <p>{sponsor.name}</p>
            {sponsor.link ? (
              <Link href={sponsor.link}>
                <Image
                  className={styles.sponsorImg}
                  src={sponsor.imagePath}
                  alt={sponsor.name}
                  width={100}
                  height={100}
                />
              </Link>
            ) : (
              <Image
                className={styles.sponsorImg}
                src={sponsor.imagePath}
                alt={sponsor.name}
                width={100}
                height={100}
              />
            )}
            <button onClick={(e) => handleDelete(e, sponsor._id)}>
              Delete
            </button>
          </span>
        );
      })}

      <h3>Add New</h3>

      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Sponsor name
          <input type="name" name="name" defaultValue={"New Sponsor"} />
        </label>
        <label>
          {" "}
          Choose File
          <input type="file" name="file" placeholder="Select File" />
        </label>
        <label>
          {" "}
          Link
          <input type="text" name="link" placeholder="Enter URL" />
        </label>
        <button>Upload</button>
      </form>
    </div>
  );
};
export default Sponsors;
