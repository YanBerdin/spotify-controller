import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  return useContext(NotificationContext);
};

// Composant Provider pour encapsuler les notifications
export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /*
  const createToast = useCallback(type, icon, title, text) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, type, icon, title, text }]);
  };
*/
  const createToast = useCallback((type, icon, title, text) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, type, icon, title, text }]);
    console.log("createToast");
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    console.log("removeToast");
  }, []);

  /*
  const showErrorToast = useCallback(error) => {
    createToast(
      "error",
      "fa-circle-exclamation",
      "Error",
      error.message || "An unexpected error occurred."
    );
  };
*/
  const showErrorToast = useCallback(
    (error) => {
      createToast(
        "error",
        "fa-circle-exclamation",
        "Error",
        error.message || "An unexpected error occurred."
      );
    },
    [createToast]
  );

  return (
    <NotificationContext.Provider
      value={{ toasts, createToast, removeToast, showErrorToast }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Validation des propriétés du NotificationProvider
NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
