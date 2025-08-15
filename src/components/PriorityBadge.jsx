import React from "react";
export default function PriorityBadge({ level }){
  if(level === "high") return <span className="badge high">High</span>;
  if(level === "medium") return <span className="badge medium">Medium</span>;
  return <span className="badge low">Low</span>;
}
