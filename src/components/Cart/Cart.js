import style from "./Cart.module.css";
import Model from "../UI/Model";
import CartContext from "../../store/cart-contex";
import { Fragment, useState, useContext } from "react";
import CartItem from "./CartItem";
import Checkout from "../Cart/Checkout";

const Cart = (props) => {
  const Cartctx = useContext(CartContext);
  const hasItems = Cartctx.items.length;
  const [isOrder, setIsOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [haveSubmitted, setHaveSubmitted] = useState(false);

  const addItemCartHandler = (item) => {
    Cartctx.addItem({ ...item, amount: 1 });
  };

  const removeItemCartHandler = (id) => {
    Cartctx.removeItem(id);
  };

  const orderHandler = () => {
    setIsOrder(true);
  };

  const CartItems = (
    <ul className={style["cart-items"]}>
      {Cartctx.items.map((meal) => (
        <CartItem
          key={meal.id}
          name={meal.name}
          amount={meal.amount}
          price={meal.price}
          onAdd={() => {
            addItemCartHandler(meal);
          }}
          onRemove={() => {
            removeItemCartHandler(meal.id);
          }}
        />
      ))}
    </ul>
  );

  //submit cart
  const cardSubmitHandler = async (userdata) => {
    setIsSubmitting(true);
    const res = await fetch(
      "https://food-app-adac7-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userdata,
          items: Cartctx.items,
        })
      }
    );

    setIsSubmitting(false);
    setHaveSubmitted(true);
    Cartctx.clearCart()
  };

  const modelAction = (
    <div className={style.actions}>
      <button className={style["button--alt"]} onClick={props.onClick}>
        Close
      </button>
      {hasItems > 0 && (
        <button onClick={orderHandler} className={style["button  "]}>
          Order
        </button>
      )}
    </div>
  );

  const cardModelContent = (
    <Fragment>
      {CartItems}
      <div className={style.total}>
        <span>Total</span>
        <span>{Cartctx.totalAmount}</span>
      </div>
      {!isOrder && modelAction}
      {isOrder && (
        <Checkout onConfirm={cardSubmitHandler} onCancel={props.onClick} />
      )}
    </Fragment>
  );

  const cardSubmitted = (
    <div className={style.actions}>
      <p>Sent data</p>
      <button className={style["button--alt"]} onClick={props.onClick}>
        Close
      </button>
      </div>
  );
  return (
    <Model onClick={props.onClick}>
      {!isSubmitting && !haveSubmitted && cardModelContent}
      {isSubmitting && !haveSubmitted && <p>Sending....</p>}
      {!isSubmitting && haveSubmitted && cardSubmitted}
    </Model>
  );
};

export default Cart;
