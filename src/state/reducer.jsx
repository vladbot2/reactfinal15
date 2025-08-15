import { genId } from "../id.jsx";
import { formatDate } from "../date.jsx";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: genId(),
          text: action.payload.text,
          description: action.payload.description,
          date: action.payload.date || formatDate(),
          completed: false,
          tags: action.payload.tags || [],
          priority: action.payload.priority || "low",
          project: action.payload.project || null
        }
      ];
    case "toggle":
      return state.map(t =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    case "remove":
      return state.filter(t => t.id !== action.id);
    case "update":
      return state.map(t =>
        t.id === action.payload.id ? { ...t, ...action.payload.data } : t
      );
    default:
      return state;
  }
}

export default reducer;
