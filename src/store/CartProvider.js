import React,{useReducer} from "react"

import CartContext from "./cart-context"

const defaultCartState = {
    items:[],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === "ADD"){
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
        //const updatedItems = state.items.concat(action.item);
        let updatedItem;
        let updatedItems;
        const indexElement = state.items.findIndex((item)=>(item.id === action.item.id));
        //console.log("state.items:", state.items);
        //console.log("action.item.id", action.item.id);
        const existingItem = state.items[indexElement];
        if(existingItem){
            console.log("ADD with existing item:", existingItem);
            updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[indexElement] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }
    if(action.type === "REMOVE"){
        const elementIndex = state.items.findIndex((item) => action.id === item.id);
        const existingElement = state.items[elementIndex];
        let updatedItems = [...state.items];
        let updatedAmount = state.totalAmount;
        if(existingElement){
            updatedAmount = state.totalAmount - state.items[elementIndex].price;
            if(existingElement.amount === 1){
                updatedItems = state.items.filter((item) => item.id !== action.id);
            }else{
                updatedItems[elementIndex].amount--;
            }
                
        }
            return {
                items: updatedItems,
                totalAmount: updatedAmount
            }


    
    }
    return defaultCartState;
}

const CartProvider = (props) =>{
    const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatch({type:"ADD", item:item})
    };

    const removeItemFromCartHandler = (id) => {
        dispatch({type:"REMOVE", id:id})
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        remove: removeItemFromCartHandler
    }
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider