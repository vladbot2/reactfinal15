import React from "react";
import { useApp } from "./state/context.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import ProjectManager from "./components/ProjectManager.jsx";
import Filters from "./components/Filters.jsx";

export default function App() {
  const { state, dispatch } = useApp();

  return (
    <div className="app">
      <h1>Todo List</h1>

      {/* Пошук */}
      <div className="section">
        <input
          type="text"
          placeholder="Пошук: назва, опис, теги або пріоритет…"
          value={state.filters.search}
          onChange={(e) =>
            dispatch({ type: "SET_FILTERS", payload: { search: e.target.value } })
          }
        />
      </div>

      {/* Проєкти + Форма задачі */}
      <ProjectManager />

      <TaskForm />

      {/* Фільтри/сортування */}
      <Filters />

      {/* Список завдань (фільтрація/сортування всередині) */}
      <TaskList />
    </div>
  );
}
