"use client";
import { useEffect, useState } from "react";
import styles from "./orders.module.css";
import ordersData from "../../../data/orders.json";
import ModalNew from "../modals/modalOrders/new/newModal";
import ModalUpdate from "../modals/modalOrders/update/modal";

import Image from "next/image";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    email: "",
    products: [{ id: "", amount: "" }],
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);

  const getOrders = () => {
    setOrders(ordersData);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
  
    setSelectedProducts([]);
    setSelectedProduct(null);
    setQuantity(1);

    setModalIsOpen(false);
  };

  const handleUpdateClick = (order) => {
    setOrderToUpdate(order);
    setUpdateModalIsOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  
    setUpdateModalIsOpen(false);
   
  };

  /* ORIGINAL
  //GET
  const getOrders = async () => {
    const response = await fetch("http://localhost:3000/api/orders");
    const data = await response.json();
    setOrders(data);
  };

  //DELETE
  const handleDelete = async (id) => {
    let response = await fetch("http://localhost:3000/api/order?id=" + id, {
      method: "DELETE",
    });
    let data = await response.json();

    getOrders();
  };

  //update newOrder state. takes previous state (prevState), and return a new state.
  //new state is an object that contains all properties of the previous state (done with ...prevState = spread operator)

  const addProduct = () => {
    setNewOrder((prevState) => ({
      ...prevState,
      //the updated array contains all previous products and a new product object
      products: [...prevState.products, { id: "", amount: "" }],
    }));
  };

  // call getOrders when the component is mounted
  useEffect(() => {
    getOrders();
  }, []);

  const handleNewOrderChange = (e, index) => {
    const { name, value } = e.target;
    //creates a new array list with all products from the newOrder state
    const list = [...newOrder.products];
    //updates the product at the specified index in the list array
    list[index][name] = value;
    //updates the newOrder state with the new list array
    setNewOrder({ ...newOrder, products: list });
  };

  const handleNewOrderSubmit = async (e) => {
    e.preventDefault();
	//creates new order object with copy of newOrder state and adds date and time
    let orderToCreate = {
      ...newOrder,
      created: new Date().toISOString(),
    };
    let response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderToCreate),
    });
    let data = await response.json();

    getOrders();
  }; */

  return (
    <div className={styles.orders}>
      <div className={styles.createOrder}>
        <button
          type="button"
          onClick={() => setModalIsOpen(true)}
          className={styles.button}
        >
          Create Order
        </button>
      </div>
      <div className={styles.ordersContainer}>
        {orders.map((order, index) => {
          return (
            <div className={styles.order} key={index}>
              <h3>
                {" "}
                <b>Order</b> {index + 1}
              </h3>
              <p>
                {" "}
                <b>Email:</b> {order.email}
              </p>
              {order.products.map((product, productIndex) => {
                return (
                  <div className={styles.product} key={productIndex}>
                    <Image
                      src={product.imagePath}
                      alt={product.title}
                      width={100}
                      height={100}
                    />
                    <p>{product.title}</p>
                    <p>
                      <b>Amount:</b> {product.amount}
                    </p>
                  </div>
                );
              })}
              <p>
                <b>Created:</b> {new Date(order.created).toLocaleString()}
              </p>
              {/* <button onClick={() => handleDelete(order._id)}>
                Delete
              </button> */}
              <button onClick={() => handleUpdateClick(order)}>Update</button>
              <button>Delete</button>
            </div>
          );
        })}
      </div>

      <ModalNew
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        email={newOrder.email}
        handleCreate={handleCreate}
        setEmail={(email) => setNewOrder({ ...newOrder, email })}
      />

      <ModalUpdate
        modalIsOpen={updateModalIsOpen}
        closeModal={() => setUpdateModalIsOpen(false)}
        order={orderToUpdate}
        handleUpdate={handleUpdate}
        setOrder={setOrderToUpdate}
      />
    </div>
  );
};

export default Orders;
