import React, { createContext, useContext, useEffect, useReducer } from "react";

const LS_KEY = "todoState.v1";

const initialState = {
  tasks: [],
  projects: [{ id: "inbox", name: "Inbox" }],
  filters: {
    range: "all",       
    priority: "all",   
    projectId: "all",  
    sort: "date",      
    search: ""         
  }
};

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);

    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      projects: Array.isArray(parsed.projects) && parsed.projects.length
        ? parsed.projects
        : [{ id: "inbox", name: "Inbox" }],
      filters: { ...initialState.filters, ...(parsed.filters || {}) }
    };
  } catch {
    return initialState;
  }
}

function saveState(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const task = {
        id: Date.now().toString(),
        text: action.payload.text.trim(),
        description: action.payload.description?.trim() || "",
        tags: action.payload.tags || [],
        priority: action.payload.priority || "low",
        date: action.payload.date || "",
        projectId: action.payload.projectId || "inbox",
        completed: false
      };
      return { ...state, tasks: [...state.tasks, task] };
    }

    case "REMOVE_TASK":
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.id) };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        )
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.data } : t
        )
      };

    case "ADD_PROJECT": {
      const name = action.name?.trim();
      if (!name) return state;
      const exists = state.projects.some(p => p.name.toLowerCase() === name.toLowerCase());
      if (exists) return state;
      const project = { id: Date.now().toString(), name };
      return { ...state, projects: [...state.projects, project] };
    }

    case "REMOVE_PROJECT": {
      const projects = state.projects.filter(p => p.id !== action.id && p.id !== "inbox");
      const tasks = state.tasks.map(t =>
        t.projectId === action.id ? { ...t, projectId: "inbox" } : t
      );
      const filters = {
        ...state.filters,
        projectId: state.filters.projectId === action.id ? "all" : state.filters.projectId
      };
      return { ...state, projects, tasks, filters };
    }

    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...(action.payload || {}) } };

    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

export function useTodo() {
  return useContext(AppContext);
}

export { initialState, reducer };
