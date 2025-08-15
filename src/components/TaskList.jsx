import React from "react";
import TaskItem from "./TaskItem.jsx";
import Empty from "./Empty.jsx";

export default function TaskList({ tasks = [] }) {
  if (!tasks.length) return <Empty />;

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
