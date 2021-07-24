import CartContext from "./cart-contex";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const newTotAmt =
      state.totalAmount + action.item.price * action.item.amount;
    const existingitemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[existingitemIndex];

    let updatedItem, updatedItems;

    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingitemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: newTotAmt,
    };
  }
  if (action.type === "REMOVE") {
    const existingitemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingitemIndex];
    const updatedTotalAmt = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {...existingItem,amount : existingItem.amount - 1}
      updatedItems = [...state.items]
      updatedItems[existingitemIndex] = updatedItem;
    }

    return{
      items : updatedItems,
      totalAmount : updatedTotalAmt
    }
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemfromCart = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const clearCartHandler = () => {
    return defaultCartState
  }

  const cardContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemfromCart,
    clearCart : clearCartHandler
  };

  return (
    <CartContext.Provider value={cardContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
