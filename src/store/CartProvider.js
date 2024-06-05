import React, { useState, useEffect } from "react";
import CartContext from "./cart-context";
import axios from "axios";

const CartProvider = props => {

    const [items, updateItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
    
          try {
            const response = await axios.get(`https://crudcrud.com/api/a9ace197110944e19395c021d870d2aa/cart`);
            updateItems(response.data);
          } catch (error) {
            console.error("Error fetching cart items:", error);
          }
        };
    
        fetchCartItems();
      }, []);

    const addItemToCart = async (item) => {
        updateItems((prevItems) => [...prevItems, item]);
        try {
          await axios.post(`https://crudcrud.com/api/a9ace197110944e19395c021d870d2aa/cart`, item);
        } catch (error) {
          console.error("Error adding item to cart:", error);
        }
      };

  
    const removeItemFromCartHandler = async (id) => {
        updateItems((prevItems) => prevItems.filter((item) => item.id !== id));
        try {
          const response = await axios.get(`https://crudcrud.com/api/a9ace197110944e19395c021d870d2aa/cart`);
          const itemToDelete = response.data.find(item => item.id === id);
          if (itemToDelete) {
            await axios.delete(`https://crudcrud.com/api/a9ace197110944e19395c021d870d2aa/cart/${itemToDelete._id}`);
          }
        } catch (error) {
          console.error("Error removing item from cart:", error);
        }
      };

    const cartContext = {
        items: items,
        totolAmount: 0,
        addItem: addItemToCart,
        removeItem: removeItemFromCartHandler ,
    };
    return (
        <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
    );
};

export default CartProvider;