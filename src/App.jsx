import React, { useState } from "react";
import { TodoProvider } from "./state/context.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import ProjectManager from "./components/ProjectManager.jsx";
import "./index.css";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <TodoProvider>
      <div className="app">
        <h1>Todo List</h1>

        <TaskForm/>

        <ProjectManager/>

        <div className="section">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."/>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <TaskList filter={filter} search={search}/>
      </div>
    </TodoProvider>
  );
}
