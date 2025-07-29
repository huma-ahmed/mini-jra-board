import React, { createContext, useReducer } from 'react';
import taskReducer from '../reducers/taskReducer';

const initialState = {
  tasks: []
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
