import React, { useState } from "react";
import { useApp } from "../state/context.jsx";


export default function ProjectManager() {
  const { state, dispatch } = useApp();
  const [projectName, setProjectName] = useState("");

  function addProject() {
    if (!projectName.trim()) return;
    dispatch({ type: "addProject", payload: { name: projectName } });
    setProjectName("");
  }

  return (
    <div className="project-manager">
      <input
        value={projectName}
        onChange={e => setProjectName(e.target.value)}
        placeholder="New project"
      />
      <button onClick={addProject}>Add Project</button>
      <ul>
        {state.projects?.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
