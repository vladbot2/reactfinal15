export const initialState = {
  tasks: [],
  projects: [{ id: "inbox", name: "Inbox" }]
};

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { ...action.payload, id: Date.now(), completed: false }
        ]
      };

    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.id)
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        )
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, { id: Date.now().toString(), name: action.name }]
      };

    default:
      return state;
  }
}
