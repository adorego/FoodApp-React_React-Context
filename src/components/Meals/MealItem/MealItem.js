import React,{useContext} from "react"

import CartContext from "../../../store/cart-context"
import MealItemForm from "./MealItemForm"
import classes from "./MealItem.module.css"

const MealItem = props =>{
    const price = `$${props.price.toFixed(2)}`;
    const cartCtx = useContext(CartContext);
    
    const onSubmit = (amount) =>{
        const itemToAdd = {
            id: props.id,
            amount: amount,
            price: props.price,
            description: props.description,
            name: props.name

            
        }
        cartCtx.addItem(itemToAdd);
    }
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAmountSubmit={onSubmit} />
            </div>
        </li>
    )
}

export default MealItem