import React, { useState } from "react";

export default function TagInput({ tags = [], setTags }) {
  const [value, setValue] = useState("");

  function commit(val) {
    const t = (val ?? value).split(",").map(s => s.trim()).filter(Boolean);
    if (!t.length) { setValue(""); return; }
    const next = Array.from(new Set([...tags, ...t]));
    setTags(next);
    setValue("");
  }

  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
      {tags.map(tag => (
        <span key={tag} style={{ background:"#e2e3e5", padding:"2px 6px", borderRadius:6, fontSize:12 }}>
          #{tag} <button type="button" onClick={()=>setTags(tags.filter(x=>x!==tag))} style={{ marginLeft:6, border:0, background:"transparent", cursor:"pointer" }}>×</button>
        </span>
      ))}
      <input
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        onKeyDown={(e)=>{ if(e.key==="Enter"||e.key===","){ e.preventDefault(); commit(); } }}
        onBlur={()=>commit()}
        placeholder="tags (comma, enter)"
      />
    </div>
  );
}
