import React, { createContext, useReducer } from 'react';
import taskReducer from '../reducers/taskReducer';

const initialState = {
  tasks: [],
  username: null, // Add this to track logged-in user
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
