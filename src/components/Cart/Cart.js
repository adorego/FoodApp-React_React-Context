import React,{useContext} from "react"

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasOrder = cartCtx.items.length > 0;

    const onAddHandler = (item)=>{

        cartCtx.addItem({...item, amount:1});
    }

    const onRemoveHandler = (id)=>{
        cartCtx.remove(id);
    }
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {
                cartCtx.items.map(
                    (item) => <CartItem 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price}
                    onAdd={onAddHandler.bind(null,item)}
                    onRemove={onRemoveHandler.bind(null, item.id)}/>
                )
            }
        </ul>
    );
    return(
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes["button--alt"]}>Close</button>
                {hasOrder && <button  className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart