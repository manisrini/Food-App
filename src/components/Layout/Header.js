import React, { Fragment } from "react";
import style from "./Header.module.css";
import srcimg from '../../assets/food.jpg'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <Fragment>
      <header className={style.header}>
        <h1>Food App</h1>
        <HeaderCartButton onClick={props.onClick}/>
      </header>
      <div className={style['main-image']}>
          <img  src={srcimg} alt="delicious food"/>
      </div>
    </Fragment>
  );
};

export default Header;
