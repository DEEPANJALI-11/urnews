import React, { useState, useEffect } from "react";
import api from "../api";

const Preferences = () => {
  const [prefs, setPrefs] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const res = await api.get("preferences/");
      setPrefs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addPreference = async () => {
    if (!category) return;
    try {
      await api.post("preferences/", { category });
      setCategory("");
      fetchPreferences(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Your Preferences</h2>
      <ul>
        {prefs.map((p) => (
          <li key={p.id}>{p.category}</li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Add category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={addPreference}>Add</button>
    </div>
  );
};

export default Preferences;
