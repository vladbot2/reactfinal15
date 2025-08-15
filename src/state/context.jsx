import React, { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "./reducer.jsx";
import { loadState, saveState } from "./storage.jsx";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, [], () => loadState() || []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// Додаємо кастомний хук useApp
export function useApp() {
  return useContext(TodoContext);
}
