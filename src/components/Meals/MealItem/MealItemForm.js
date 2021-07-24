import MealItemInput from "../../UI/Input";
import style from "./MealItemForm.module.css";
import { useRef,useState } from "react";


const MealItemForm = (props) => {
  const enteredAmountRef = useRef();
  const [isFormValid, setIsFormValid] = useState(true)


  const onSubmitHandler = (event) => {
      event.preventDefault();
      const enteredAmt = enteredAmountRef.current.value;
      const  enteredAmount = +enteredAmt;

      if(enteredAmount < 1 || enteredAmt.trim().length === 0 ){
          setIsFormValid(false)
          return
      }

      props.onAddToCart(enteredAmount);
  }

  return (
    <form className={style.form} onSubmit={onSubmitHandler}>
      <MealItemInput
        ref={enteredAmountRef}
        label="amount"
        item={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          defaultValue: "1",
        }}
      />
      <button>Add to Cart</button>
      {!isFormValid && <p>Invalid</p> }
    </form>
  );
};

export default MealItemForm;
