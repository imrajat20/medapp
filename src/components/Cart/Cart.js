import React, { useContext, useState, useEffect } from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

   const [products, setProducts] = useState(cartCtx.items);
   useEffect(() => {
    setProducts(cartCtx.items);
 }, [cartCtx.items]);

 const deleteHandler = async (index, id) => {
    try {
      await cartCtx.removeItem(id); // This will handle API deletion
      const newProducts = products.filter((_, i) => i !== index);
      setProducts(newProducts); // Update local state
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };


    const cartItems = (
        <ul className={classes["cart-items"]}>
        {products.map((item,index) => (
       <li className={classes.list} key={index}>
            <div>Name:{item.title}</div>
            <span>Desc:{item.desc}</span>
             <span>Price:{item.price}</span>
              <span>Quantity:1</span>
              <button onClick={() => deleteHandler(index)}>Delete</button> 
           </li>
        ))}
      </ul>
    );

    
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                       <span>Total amount:</span>
                 <span>${}</span>
               </div>
             <div className={classes.actions}>
                <button className={classes["button-alt"]} onClick={props.onClose}>Close</button>
                <button className={classes.button}>Purchase</button>
            </div>
        </Modal>
    );
};

export default Cart;