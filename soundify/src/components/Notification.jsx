// import { useState } from 'react';
import { useNotification } from "../utils/NotificationContext";
import Toast from "./Toast";
import "../Notification.css";

const Notification = () => {
  const { toasts, removeToast } = useNotification();

  /*
  const [toasts, setToasts] = useState([]);

  const createToast = (type, icon, title, text) => {
    const id = Date.now();
    setToasts([...toasts, { id, type, icon, title, text }]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  // eslint-disable-next-line no-unused-vars
  const showErrorToast = (error) => {
    createToast('error', 'fa-circle-exclamation', 'Error', error.message || 'An unexpected error occurred.');
  };
*/

  return (
    <div>
      {/*
      <div className="buttons">
        <button className="btn" onClick={() => createToast('success', 'fa-circle-check', 'Success', 'This is a success toast.')}>Success</button>
        <button className="btn" onClick={() => createToast('error', 'fa-circle-exclamation', 'Error', 'This is an error toast.')}>Error</button>
        <button className="btn" onClick={() => createToast('warning', 'fa-triangle-exclamation', 'Warning', 'This is a warning toast.')}>Warning</button>
        <button className="btn" onClick={() => createToast('info', 'fa-circle-info', 'Info', 'This is an info toast.')}>Info</button>
      </div>
      */}
      <div className="notifications">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            icon={toast.icon}
            title={toast.title}
            text={toast.text}
            removeToast={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Notification;
