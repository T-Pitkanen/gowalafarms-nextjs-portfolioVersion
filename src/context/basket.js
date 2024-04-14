"use client";

//Context API provides a way to pass data through the component tree without having to pass props manually at every level.
//It's designed to share data that can be considered "global" for a tree of React components, such as the currently authenticated user, theme, or preferred language.

import { createContext, useContext, useEffect, useState } from "react";

const BasketContext = createContext();

export const BasketContextProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [name, setName] = useState("Name");

  //loading basket from local storage
  useEffect(() => {
    const basket = localStorage.getItem("basket");
    if (basket) {
      setBasket(JSON.parse(basket));
    }
  }, []);

  //addToBasket, changeProductAmount, and removeFromBasket
  //manipulate the basket state and synchronize it with localStorage.

  const addToBasket = (id, amount = 1) => {
    //retrieve the basket items from local storage
    let basket = localStorage.getItem("basket");

    if (basket) {
      basket = JSON.parse(basket);
      const existingProductIndex = basket.findIndex((item) => item.id === id);

      if (existingProductIndex >= 0) {
        // add the amount argument to the existing amount of the product in the basket
        basket[existingProductIndex].amount += amount;

        // amount wont go below 1
        if (basket[existingProductIndex].amount < 1) {
          basket[existingProductIndex].amount = 1;
        }
      } else {
        basket.push({
          id: id,
          amount: amount,
        });
      }
    } else {
      basket = [
        {
          id: id,
          amount: amount,
        },
      ];
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    setBasket(basket);
  };

  const getProductsForBasket = async () => {
    let basket = localStorage.getItem("basket");
    basket = JSON.parse(basket);

    if (basket && basket.length > 0) {
      let productIds = basket.map((item) => item.id);
      let result = await fetch("/api/products?range=" + productIds.toString());
      let data = await result.json();
      console.log(data);

      data = data.map((product) => {
        let basketItem = basket.find((item) => item.id === product._id);
        product.amount = basketItem.amount;
        return product;
      });

      console.log(data);

      return data;
    }

    return [];
  };

  const cleanBasket = () => {
    localStorage.removeItem("basket");
    setBasket([]);
  };

  //updates the quantity of a specific product in a shopping basket, both in the local storage and in the component's state.
  const changeProductAmount = (id, newAmount) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    //find the index of the product with the matching id
    const productIndex = basket.findIndex((item) => item.id === id);

    //if the product is found, update the amount and store the new basket in local storage
    if (productIndex >= 0) {
      basket[productIndex].amount = newAmount;
      localStorage.setItem("basket", JSON.stringify(basket));
      setBasket(basket);
    }
  };

  const isInBasket = (id) => {
    try {
      let basket = localStorage.getItem("basket");

      if (basket) {
        basket = JSON.parse(basket);

        let index = basket.findIndex((item) => item.id === id);
        if (index !== -1) {
          return true;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const removeFromBasket = (id) => {
    //retrieves the item with the 'basket' key from local storage, parses it, and converts it to a JavaScript object/array.
    let basket = JSON.parse(localStorage.getItem("basket"));
    //filters out the item with the matching id, resulting in a new array without the removed item.
    basket = basket.filter((item) => item.id !== id);
    //converts the new array back to a JSON string and stores it in local storage.
    localStorage.setItem("basket", JSON.stringify(basket));
    //updates the basket state with the new array.
    setBasket(basket);
  };

  return (
	//provide data to the child components. includes state variables, basket and name, and functions.
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        changeProductAmount,
        removeFromBasket,
        cleanBasket,
        getProductsForBasket,
        isInBasket,
        name,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
