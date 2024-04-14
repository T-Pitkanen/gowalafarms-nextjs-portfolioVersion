"use client";
import { useEffect, useState } from "react";
import styles from "./orders.module.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    email: "",
    products: [{ id: "", amount: "" }],
  });

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
  };

  return (
    <div className={styles.orders}>
      <div className={styles.createOrder}>
        <form onSubmit={handleNewOrderSubmit} className={styles.form}>
          <h2>Create Order</h2>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setNewOrder({ ...newOrder, email: e.target.value })
            }
            className={styles.input}
          />
          {newOrder.products.map((x, i) => {
            return (
              <div className={styles.box} key={i}>
                <input
                  name="id"
                  placeholder="Product ID"
                  value={x.id}
                  onChange={(e) => handleNewOrderChange(e, i)}
                  className={styles.input}
                />
                <input
                  name="amount"
                  placeholder="Amount"
                  value={x.amount}
                  onChange={(e) => handleNewOrderChange(e, i)}
                  className={styles.input}
                />
              </div>
            );
          })}
          <button type="button" onClick={addProduct} className={styles.button}>
            Add Product
          </button>
          <button type="submit" className={styles.button}>
            Create Order
          </button>
        </form>
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
                    <p>
                      <b>Product ID:</b> {product.id}
                    </p>
                    <p>
                      <b>Amount:</b> {product.amount}
                    </p>
                  </div>
                );
              })}
              <p>
                <b>Created:</b> {new Date(order.created).toLocaleString()}
              </p>
              <button onClick={() => handleDelete(order._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
