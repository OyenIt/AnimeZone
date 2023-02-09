import { useEffect, useState } from "react";
import './PopupLink.scss';
import popupStyles from "./custom-popup.module.css";
import PropTypes from "prop-types";
const PopupLink = props => {
    const [show, setShow] = useState(false);
 
    const closeHandler = (e) => {
      setShow(false);
      props.onClose(false);
    };
   
    useEffect(() => {
      setShow(props.show);
    }, [props.show]);
   
    return (
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0"
        }}
        className={popupStyles.overlay}
      >
        <div className={popupStyles.popup}>
          <h1>{props.title}</h1>
          <span className={popupStyles.close} onClick={closeHandler}>
            &times;
          </span>
          <div className={popupStyles.content}>{props.children}</div>
        </div>
      </div>
    );
}
PopupLink.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

export default PopupLink