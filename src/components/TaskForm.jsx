import React, { useState } from "react";
import { useApp } from "../state/context.jsx";

export default function TaskForm() {
  const { state, dispatch } = useApp();
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("low");
  const [projectId, setProjectId] = useState("inbox");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        text,
        description,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        priority,
        projectId,
        date
      }
    });

    // моментальне очищення (жодних "лагів")
    setText("");
    setDescription("");
    setTags("");
    setPriority("low");
    setProjectId("inbox");
    setDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Назва завдання…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="row">
        <select className="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
        </select>
        <input
          className="input"
          type="text"
          placeholder="теги (через кому)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div className="row">
        <input
          className="input"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select className="select" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          {state.projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn">➕ Додати завдання</button>
    </form>
  );
}
