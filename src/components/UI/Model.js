import ReactDOM from "react-dom";
import React from "react";
import style from "./Model.module.css";

const Backdrop = (props) => {
  return <div className={style.backdrop} onClick={props.onClick}></div>;
};

const OverlayModel = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.content }> {props.children}</div>
    </div>
  );
};

const Model = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, document.getElementById("overlay"))}
      {ReactDOM.createPortal(
        <OverlayModel>{props.children}</OverlayModel>,
        document.getElementById("overlay")
      )}
    </React.Fragment>
  );
};

export default Model;
