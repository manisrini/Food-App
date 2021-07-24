import style from "./MealItem.module.css";
import MealItemForm from './MealItemForm'
import {useContext} from "react"
import CardContext from '../../../store/cart-contex'

const MealItem = (props) => {

    const cardCtx = useContext(CardContext)

    const addToCartHandler = (amount) => {
        cardCtx.addItem({
          price : props.meal.price,
          id : props.meal.id,
          amount : amount,
          name : props.meal.name

        })
    }

  return (
    <li className={style.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={style.description}>{props.meal.description}</div>
        <div className={style.price}>Rs {props.meal.price}</div>
      </div>
      
    <MealItemForm onAddToCart = {addToCartHandler}/>     
    </li>
  );
};

export default MealItem;
