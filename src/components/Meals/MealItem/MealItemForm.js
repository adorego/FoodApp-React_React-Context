import React,{useRef, useState} from "react"

import Input from "../../UI/Input"
import classes from "./MealItemForm.module.css"

const MealItemForm = props => {
    const amountInputRef = useRef();
    const [isValid, setIsValid] = useState(true);
    
    const onSubmit = (e) => {
        e.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 0 || enteredAmountNumber > 5){
            setIsValid(false);
            return
        }
        props.onAmountSubmit(enteredAmountNumber);
       
    }
    return(
        <form className={classes.form} onSubmit={onSubmit}>
            <Input 
            label="Amount"
            ref={amountInputRef}
            input={{
                id:"amount_"+ props.id,
                type:"number",
                min: "1",
                max:"5",
                step:"1",
                defaultValue: "1"

            }} />
            <button>+ Add</button>
            {!isValid && <p>Enter valid valid 1-5</p>}
        </form>
    )
}

export default MealItemForm