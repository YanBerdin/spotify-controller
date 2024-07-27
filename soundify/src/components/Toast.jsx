import { useEffect } from "react";
import PropTypes from "prop-types"; // Import prop-types library
import "../Toast.css";

const Toast = ({ type, icon, title, text, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast();
    }, 5000);

    return () => clearTimeout(timer);
  }, [removeToast]);

  return (
    <div className={`toast ${type}`}>
      <i className={`fa ${icon}`}></i>
      <div className="content">
        <div className="title">{title}</div>
        <span>{text}</span>
      </div>
      <i className="close fa-solid fa-xmark" onClick={removeToast}></i>
    </div>
  );
};

// Add prop types validation
Toast.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  removeToast: PropTypes.func.isRequired,
};

export default Toast;
