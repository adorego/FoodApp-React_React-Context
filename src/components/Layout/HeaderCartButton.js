import React,{useContext, useEffect, useState} from "react"

import CartContext from "../../store/cart-context"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = props =>{

    const cartContext = useContext(CartContext);
    const [isButtonBmp, setButtonBmp] = useState(false);
    //console.log("items:", cartContext.items);
    const items = cartContext.items;
    const numberOfItems = items.reduce((currentNumber, item)=>{
        return currentNumber + item.amount;
    },0)
    //console.log("numberOfItems:", numberOfItems);
    const classButton = `${classes.button} ${isButtonBmp ?  classes.bump : ""}`;

    useEffect(()=>{
        if(items.length === 0){
            return
        }
        setButtonBmp(true);

        const timeOutId = setTimeout(()=>{
            setButtonBmp(false);
        },300)
        return ()=>{
            clearTimeout(timeOutId)
        };
            
        
    },[items])
    return(
        <button className={classButton} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton