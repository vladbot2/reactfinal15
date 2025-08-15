import React from "react";

export default function PriorityBadge({ priority }) {
  const map = {
    low: "priority-low",
    medium: "priority-medium",
    high: "priority-high",
  };
  return <span className={map[priority] || ""}>{priority}</span>;
}
