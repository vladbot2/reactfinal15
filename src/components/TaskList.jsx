import React from "react";
import { useApp } from "../state/context.jsx";
import TaskItem from "./TaskItem.jsx";
import Empty from "./Empty.jsx";
import { isToday, isInNextWeek, isInThisMonth } from "../date.jsx";

export default function TaskList() {
  const { state } = useApp();
  const { tasks, filters } = state;

  const q = (filters.search || "").toLowerCase();

  let list = tasks.filter(t => {
    const textOk =
      t.text.toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q) ||
      (t.tags || []).some(tag => tag.toLowerCase().includes(q)) ||
      (t.priority || "").toLowerCase().includes(q);

    let rangeOk = true;
    if (filters.range === "day") rangeOk = t.date && isToday(t.date);
    if (filters.range === "week") rangeOk = t.date && isInNextWeek(t.date);
    if (filters.range === "month") rangeOk = t.date && isInThisMonth(t.date);

    const priorityOk = filters.priority === "all" || t.priority === filters.priority;
    const projectOk = filters.projectId === "all" || t.projectId === filters.projectId;

    return textOk && rangeOk && priorityOk && projectOk;
  });

  if (filters.sort === "priority") {
    const order = { high: 0, medium: 1, low: 2 };
    list.sort((a, b) => (order[a.priority] ?? 9) - (order[b.priority] ?? 9));
  } else if (filters.sort === "title") {
    list.sort((a, b) => a.text.localeCompare(b.text));
  } else {
    list.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  }

  if (!list.length) return <Empty />;

  return (
    <ul className="task-list">
      {list.map(task => <TaskItem key={task.id} task={task} />)}
    </ul>
  );
}
