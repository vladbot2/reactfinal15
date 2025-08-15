import { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function TodoForm() {
  const [text, setText] = useState("");
  const { dispatch } = useContext(TodoContext);

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: "add", text });
    setText("");
  }

  return (
    <form onSubmit={submit} className="todo-form">
      <input value={text} onChange={e => setText(e.target.value)} placeholder="New task..." />
      <button>Add</button>
    </form>
  );
}
