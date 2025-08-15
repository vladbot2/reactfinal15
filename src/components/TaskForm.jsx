import React, { useState, useContext } from "react";
import { TodoContext } from "../state/context.jsx"; // <- правильний імпорт
import TagInput from "./TagInput.jsx";


export default function TaskForm({ projects }) {
  const { dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState("low");
  const [project, setProject] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch({
      type: "add",
      payload: { text, description, tags, priority, project, date: date || new Date().toISOString() }
    });

    setText("");
    setDescription("");
    setTags([]);
    setPriority("low");
    setProject("");
    setDate("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Task name"
        required
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <TagInput tags={tags} setTags={setTags} />

      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select value={project} onChange={e => setProject(e.target.value)}>
        <option value="">No project</option>
        {projects?.map(p => (
          <option key={p.id} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button>Add Task</button>
    </form>
  );
}
