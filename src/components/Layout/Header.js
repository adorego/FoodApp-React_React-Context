import React,{Fragment} from "react"

import HeaderCartButton from "./HeaderCartButton"
import classes from "./Header.module.css"
import image from "../../assets/meals.jpeg"

const Header = props => {
    return(
        <Fragment>
        <header className={classes.header}>
           <h2>FoodApp</h2> 
           <HeaderCartButton onClick={props.onCartOpen}/>
        </header>
        <div className={classes["main-image"]}>
            <img src={image} alt="Table of foods" />
        </div>
        </Fragment>
        
        
    )
}

export default Header