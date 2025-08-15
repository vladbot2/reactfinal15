import React from "react";

export default function Filters({ filter, setFilter }) {
  return (
    <div className="filters">
      <button onClick={() => setFilter("all")} className={filter==="all"?"active":""}>All</button>
      <button onClick={() => setFilter("day")} className={filter==="day"?"active":""}>Day</button>
      <button onClick={() => setFilter("week")} className={filter==="week"?"active":""}>Week</button>
      <button onClick={() => setFilter("month")} className={filter==="month"?"active":""}>Month</button>
    </div>
  );
}
