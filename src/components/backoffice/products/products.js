"use client";
import { useEffect, useState } from "react";
import styles from "./products.module.css";
import Image from "next/image";
import productsData from "../../../data/products.json";
import ModalNew from "../modals/modalProducts/new/modal";
import ModalUpdate from "../modals/modalProducts/update/modal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");

  const getProducts = () => {
    setProducts(productsData);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleCreate = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUpdateModalIsOpen(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setUpdateModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
    setUpdateModalIsOpen(false);
  };

  /*  ORIGINAL
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
  }; */

  return (
    <div className={styles.container}>
      <button className={styles.newBtn} onClick={handleCreate}>Add New Product</button>
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
              {/* <button onClick={(e) => handleDelete(e, product._id)}>
                Delete
              </button> */}
              <div className={styles.buttons}>
                {" "}
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button>Delete</button>{" "}
              </div>
            </span>
          );
        })}
      </div>

      <ModalNew
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        id={id}
        image={image}
        title={title}
        description={description}
        discount={discount}
        price={price}
        handleCreate={handleCreate}
        setTitle={setTitle}
        setImage={setImage}
        setDescription={setDescription}
        setDiscount={setDiscount}
        setPrice={setPrice}
      />

      <ModalUpdate
        modalIsOpen={updateModalIsOpen}
        closeModal={closeModal}
        id={id}
        product={selectedProduct}
        image={image}
        title={title}
        description={description}
        discount={discount}
        price={price}
        handleCreate={handleCreate}
        setTitle={setTitle}
        setImage={setImage}
        setDescription={setDescription}
        setDiscount={setDiscount}
        setPrice={setPrice}
      />
    </div>
  );
};

export default Products;
