import React, { useState } from "react";
import { useApp } from "../state/context.jsx";

export default function ProjectManager() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState("");

  function add() {
    if (!name.trim()) return;
    dispatch({ type: "ADD_PROJECT", name });
    setName("");
  }

  return (
    <div className="project-manager">
      <div className="row">
        <input
          className="input"
          placeholder="Новий проєкт"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <button onClick={add}>Додати проєкт</button>
      </div>

      <ul className="project-list">
        {state.projects.map(p => {
          const active = state.filters.projectId === p.id;
          return (
            <li key={p.id}>
              <button
                className={`pill ${active ? "active" : ""}`}
                onClick={() => dispatch({ type: "SET_FILTERS", payload: { projectId: p.id } })}
              >
                {p.name}
              </button>
              {p.id !== "inbox" && (
                <button className="ghost danger" onClick={() => dispatch({ type: "REMOVE_PROJECT", id: p.id })}>
                  Видалити
                </button>
              )}
            </li>
          );
        })}
        <li>
          <button
            className={`pill ${state.filters.projectId === "all" ? "active" : ""}`}
            onClick={() => dispatch({ type: "SET_FILTERS", payload: { projectId: "all" } })}
          >
            Усі проєкти
          </button>
        </li>
      </ul>
    </div>
  );
}
