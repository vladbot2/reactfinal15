import React from "react";

export default function TagInput({ tags = [], setTags }) {
  function handleChange(e) {
    const value = e.target.value;
    const newTags = value.split(",").map(t => t.trim()).filter(t => t);
    setTags(newTags);
  }

  return (
    <input
      type="text"
      value={tags.join(", ")}
      onChange={handleChange}
      placeholder="Tags (comma separated)"
    />
  );
}
