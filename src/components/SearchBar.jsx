import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Пошук за назвою/описом/тегами/пріоритетом…"
      value={query}
      onChange={(e)=>setQuery(e.target.value)}
    />
  );
}
