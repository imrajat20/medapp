import React, { useContext, useEffect, useState } from "react";
import classes from './MedicList.module.css';
import CartContext from "../../store/cart-context";
import axios from "axios";

const MedicList  = (props) => {

    const cartCtx = useContext(CartContext);
    const onAdd = (medicine) => {
        cartCtx.addItem(medicine);
    }
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
    
          try {
            const response = await axios.get(`https://crudcrud.com/api/a9ace197110944e19395c021d870d2aa/list`);
            setData(response.data);
          } catch (error) {
            console.error("Error fetching cart items:", error);
          }
        };
    
        fetchCartItems();
      }, []);

    return (
        <section className={classes.section}>
            <div className={classes.container}>
            {data.map((medicine, index) => (
                <div key={index}>
                    <h3>{medicine.name}</h3>
                    <p>{medicine.description}</p>
                    <p>Price: ${medicine.price}</p>
                    <button onClick={() => onAdd(medicine)}>Add to cart</button>
                </div>
            ))}
        </div>
        </section>
    );
    
};

export default MedicList;