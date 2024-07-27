import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { NotificationProvider } from "./NotificationContext";

export const StateContext = createContext();

export const Provider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    <NotificationProvider>{children}</NotificationProvider>
  </StateContext.Provider>
);

Provider.propTypes = {
  initialState: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => useContext(StateContext);
