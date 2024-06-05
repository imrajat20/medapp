import React, { useContext, useState } from "react";
import classes from './MedicForm.module.css';
import CartContext from "../../store/cart-context";
import axios from "axios";

const MedicForm = (props) => {

    const cartCtx = useContext(CartContext);

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');

    const formHandler = async (event) => {
        event.preventDefault();
        const product = {
            name:name,
            desc:desc,
            price:price
        }
        props.onAdd(product);
        try {
           await axios.post(`https://crudcrud.com/api/a9ace197110944e19395c021d870d2aa/list`, product)
        }catch(error){
             console.log("the error is", error)
        }
        setName('');
        setDesc('');
        setPrice('');
    };

    return (
       <section className={classes.cont} >
         <form onSubmit={formHandler} className={classes.form}>
            <label htmlFor="name">Medicine Name:</label>
            <input type="text" id="name" onChange={(e) => setName(e.target.value)} required/>

            <label htmlFor="desc">Desc.</label>
            <input type="text" id="desc" onChange={(e) => setDesc(e.target.value)} required/>

            <label htmlFor="price">Price</label>
            <input type="tel" id="price" onChange={(e) => setPrice(e.target.value)} required/>

            <button type="submit">Add Medicine</button>
        </form>
        <button className={classes.cart} onClick={props.onClick}>
                    Cart
                    <span className={classes.badge}>{cartCtx.items.length}</span>
        </button>
       </section>
    );
};

export default MedicForm;