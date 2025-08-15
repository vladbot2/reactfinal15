import React from "react";
import { useApp } from "../state/context.jsx";

export default function SearchBar(){
  const { state, dispatch } = useApp();
  return (
    <input className="input" placeholder="Search by title, description, tags, priority"
      value={state.ui.query}
      onChange={e=>dispatch({ type:"SET_UI", patch:{ query: e.target.value } })} />
  );
}
