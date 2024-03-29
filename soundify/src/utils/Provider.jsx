import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
export const StateContext = createContext();

export const Provider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

Provider.propTypes = {
  initialState: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export const useProvider = () => useContext(StateContext);