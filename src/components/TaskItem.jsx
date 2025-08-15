import React, { useState, useContext } from "react";
import { TodoContext } from "../state/context.jsx";
import PriorityBadge from "./PriorityBadge.jsx";
import TagInput from "./TagInput.jsx";
import { formatDate } from "../date.jsx";
import { genId } from "../id.jsx";

export default function TaskItem({ task }) {
  const { dispatch } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [description, setDescription] = useState(task.description || "");
  const [tags, setTags] = useState(task.tags || []);
  const [priority, setPriority] = useState(task.priority);
  const [project, setProject] = useState(task.project || "");
  const [date, setDate] = useState(task.date);

  function saveEdit() {
    dispatch({
      type: "edit",
      payload: { id: task.id, text, description, tags, priority, project, date }
    });
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li>
        <input value={text} onChange={e => setText(e.target.value)} />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <TagInput tags={tags} setTags={setTags} />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input value={project} onChange={e => setProject(e.target.value)} placeholder="Project" />
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} />
        <button onClick={saveEdit}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </li>
    );
  }

  return (
    <li className={task.completed ? "done" : ""}>
      <span onClick={() => dispatch({ type: "toggle", id: task.id })}>
        {task.text} <small>{new Date(task.date).toLocaleString()}</small>
        <PriorityBadge priority={task.priority} />
        {task.tags.map(tag => <span key={tag}> #{tag}</span>)}
        {task.project && <span> [{task.project}]</span>}
      </span>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => dispatch({ type: "remove", id: task.id })}>✖</button>
    </li>
  );
}
