import React, { useEffect, useState } from "react";
import api, { setAuthToken } from "../api";

const SavedArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
  try {
    const res = await api.get("saved-articles/"); // JWT token included
    setArticles(res.data); // only articles for the logged-in user
  } catch (err) {
    console.error(err);
  }
};

  const deleteArticle = async (id) => {
    try {
      await api.delete(`saved-articles/${id}/`);
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Saved Articles</h2>
      <ul>
        {articles.map(a => (
          <li key={a.id}>
            <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a>
            <button onClick={() => deleteArticle(a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedArticles;
