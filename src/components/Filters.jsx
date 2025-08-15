import React, { useState } from "react";
import { useApp } from "../state/context.jsx";

export default function ProjectManager() {
  const { projects, addProject } = useApp();
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addProject(name);
    setName("");
  };
  console.log(projects);
  return (
  
    <div className="project-manager">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Назва проєкту"
      />
      <button onClick={handleAdd}>Додати проєкт</button>

      <div className="project-list">
        {projects.map(p => (
          <span key={p.id} className="tag">{p.name}</span>
        ))}
      </div>
    </div>
  );
}
