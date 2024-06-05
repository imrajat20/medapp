import { useState } from 'react';
import './App.css';
import MedicForm from './components/MedicForm/MedicForm';
import MedicList from './components/MedicList/MedicList';
import Cart from './components/Cart/Cart';

function App() {

  const [medicines, setMedicine] = useState([]);

    const onAdd = (medicine) => {
        setMedicine([...medicines, medicine])
    }
     
    const [cartIsShown, setCartIsShown] = useState(false);
  
     const showCart = () => {
       setCartIsShown(true);
     };
     const hideCart = () => {
       setCartIsShown(false);
     };
  return (
    <div className="App">
      {cartIsShown && <Cart onClose={hideCart}/>}
      <MedicForm onAdd={onAdd} onClick={showCart}/>
      <MedicList medicines={medicines}/>
    </div>
  );
}

export default App;
