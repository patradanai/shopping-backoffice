import React, { useReducer } from "react";

const Context = React.createContext();

const createContext = (reducer, actions, initialStore) => {
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStore);
    const boundAction = {};

    for (let i in actions) {
      boundAction[i] = actions[i](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundAction }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};

export default createContext;
