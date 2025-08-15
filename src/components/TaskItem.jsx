import React, { useState } from "react";
import { useApp } from "../state/context.jsx";
import { formatDate } from "../date.jsx";

export default function TaskItem({ task }) {
  const { state, dispatch } = useApp();
  const [edit, setEdit] = useState(false);

  const [text, setText] = useState(task.text);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);
  const [tags, setTags] = useState((task.tags || []).join(", "));
  const [date, setDate] = useState(task.date || "");
  const [projectId, setProjectId] = useState(task.projectId || "inbox");

  const projectName = state.projects.find(p => p.id === task.projectId)?.name || "";

  function toggle()   { dispatch({ type: "TOGGLE_TASK", id: task.id }); }
  function remove()   { dispatch({ type: "REMOVE_TASK", id: task.id }); }
  function save() {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: task.id,
        data: {
          text,
          description,
          priority,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean),
          date,
          projectId
        }
      }
    });
    setEdit(false);
  }

  if (edit) {
    return (
      <li className="task-item">
        <input value={text} onChange={(e)=>setText(e.target.value)} className="input" />
        <input value={description} onChange={(e)=>setDescription(e.target.value)} className="input" placeholder="Опис" />
        <input value={tags} onChange={(e)=>setTags(e.target.value)} className="input" placeholder="теги, через кому" />
        <div className="row">
          <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="select">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
          <select value={projectId} onChange={(e)=>setProjectId(e.target.value)} className="select">
            {state.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)} className="input" />
        </div>
        <div className="row">
          <button onClick={save}>Зберегти</button>
          <button onClick={()=>setEdit(false)}>Скасувати</button>
        </div>
      </li>
    );
  }

  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <div className="task-main" onClick={toggle}>
        <b>{task.text}</b>{" "}
        {task.date && <small className="muted">{formatDate(task.date)}</small>}
        <span className={`badge priority-${task.priority}`}>{task.priority}</span>
        {(task.tags || []).map(t => <span key={t} className="tag">#{t}</span>)}
        {projectName && <span className="tag">[{projectName}]</span>}
        {task.description && <div className="desc">{task.description}</div>}
      </div>
      <div className="row">
        <button onClick={()=>setEdit(true)}>Редагувати</button>
        <button onClick={remove}>✖</button>
      </div>
    </li>
  );
}
