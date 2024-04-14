"use client";
import { useEffect, useState } from "react";
import styles from "./products.module.css";
import Image from "next/image";

const Products = () => {
  const [products, setProducts] = useState([]);


  //GET
  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);


  //CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, file, price, discountInPercent, exclusive } =
      e.target.elements;

    if (
      !title.value ||
      !price.value ||
      !description.value ||
      !discountInPercent.value ||
      !exclusive.value ||
      !file.files[0]
    ) {
      console.log("You need to add a file, name, description and position!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("price", price.value);
    formData.append("discountInPercent", discountInPercent.value);
    formData.append("exclusive", exclusive.value);
    formData.append("description", description.value);
    formData.append("file", file.files[0]);

    let response = await fetch("http://localhost:3000/api/product", {
      method: "POST",
      body: formData,
    });

    let data = await response.json();

    getProducts();
  };


  //DELETE
  const handleDelete = async (e, id) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/api/product?id=" + id, {
      method: "DELETE",
    });
    let data = await response.json();

    getProducts();
  };

  //UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { id, title, price, discountInPercent, description, exclusive, file } =
        e.target.elements;

      const formData = new FormData();
      formData.append("id", id.value);
      formData.append("title", title.value);
      formData.append("price", price.value);
      formData.append("description", description.value);
      formData.append("discountInPercent", discountInPercent.value);
      formData.append("exclusive", exclusive.checked);
      formData.append("file", file.files[0]);

      if (!id.value) {
        console.log("You need to add an ID!");
        return;
      }

      let response = await fetch(
        `http://localhost:3000/api/product?id=${id.value}`,
        {
          method: "PUT",
          body: formData,
        }
      );

	  console.log(response);
	

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

	  console.log(data)
      getProducts();
      e.target.reset();
    } catch (error) {
      console.error("Error in handleUpdate:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {products.map((product, index) => {
          return (
            <span className={styles.productsContainer} key={index}>
              <Image
                className={styles.productImg}
                src={product.imagePath}
                alt={product.title}
                width={500}
                height={500}
              />
              <p>{product._id}</p>
              <p>
                <b>{product.title}</b>
              </p>
              <p>{product.description}</p>
              <p>
                <b>Discount: {product.discountInPercent}%</b>
              </p>
              <p>{product.exclusive}</p>
              <p>
                <b>Price: ${product.price}</b>{" "}
              </p>
              <button onClick={(e) => handleDelete(e, product._id)}>
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
          Title
          <input type="text" name="title" defaultValue={""} />
        </label>
        <label>
          {" "}
          Price
          <input type="number" name="price" defaultValue={""} />
        </label>
        <label>
          {" "}
          Discount In Percent
          <input type="text" name="discountInPercent" defaultValue={""} />
        </label>
        <label>
          {" "}
          Description
          <textarea type="text" name="description" defaultValue={""} />
        </label>
        <label>
          {" "}
          Exclusive?
          <input type="checkbox" name="exclusive" defaultValue={""} />
        </label>
        <label>
          {" "}
          Product Image
          <input type="file" name="file" placeholder="Select File" />
        </label>
        <button>Upload</button>
      </form>

      <h3>Update</h3>

      <form className={styles.form} onSubmit={handleUpdate}>
        <label>
          ID
          <input type="text" name="id" defaultValue={""} />
        </label>
        <label>
          Title
          <input type="text" name="title" defaultValue={""} />
        </label>
        <label>
          Price
          <input type="text" name="price" defaultValue={""} />
        </label>
        <label>
          Description
          <textarea type="text" name="description" defaultValue={""} />
        </label>
        <label>
          Discount
          <input type="text" name="discountInPercent" defaultValue={""} />
        </label>
        <label>
          Exclusive?
          <input type="checkbox" name="exclusive" />
        </label>

        <label>
          Product Image
          <input type="file" name="file" placeholder="Select File" />
        </label>

        <button>Update</button>
      </form>
    </div>
  );
};

export default Products;
