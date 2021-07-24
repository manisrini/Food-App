import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = (props) => {
  const [formIsValid, setformIsValid] = useState({
    nameIsValidState: true,
    streetIsValidState: true,
    cityIsValidState: true,
    pinIsValidState: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const pinInputRef = useRef();
  const streetInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const StringValidate = (value) => value.trim() !== "";
    const PinCodeValidate = (value) => value.trim().length === 6;

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPin = pinInputRef.current.value;

    const nameIsValid = StringValidate(enteredName);
    const streetIsValid = StringValidate(enteredStreet);
    const cityIsValid = StringValidate(enteredCity);
    const pinIsValid = PinCodeValidate(enteredPin);

   
    let formIsValid = nameIsValid && streetIsValid && cityIsValid && pinIsValid;


    setformIsValid({
      nameIsValidState: nameIsValid,
      streetIsValidState: streetIsValid,
      cityIsValidState: cityIsValid,
      pinIsValidState: pinIsValid,
    });

    if (!formIsValid) {
      
      return;
    }

    props.onConfirm({
      name : enteredName,
      street : enteredStreet,
      pincode : enteredPin,
      city : enteredCity
    })

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formIsValid.nameIsValidState && <p>Please Enter a valid name </p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formIsValid.streetIsValidState && <p>Please Enter a valid street </p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={pinInputRef} />
        {!formIsValid.pinIsValidState && <p>Please Enter a 6digit pincode </p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formIsValid.cityIsValidState && <p>Please Enter a valid city </p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
