import React, { useState, useEffect } from "react";

const NewsFeed = ({ preferences }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const NEWS_API_KEY = "e5ad6a5d7fff4d03bc1c2c5c63e76428"; // replace with your key

  useEffect(() => {
    const fetchNews = async () => {
      if (!preferences || preferences.length === 0) {
        setLoading(false);
        return;
      }

      let allArticles = [];

      for (const category of preferences) {
        try {
          const res = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${NEWS_API_KEY}`
          );
          const data = await res.json();
          if (data.articles) {
            allArticles = allArticles.concat(data.articles);
          }
        } catch (err) {
          console.error("Error fetching news:", err);
        }
      }

      setArticles(allArticles);
      setLoading(false);
    };

    fetchNews();
  }, [preferences]);

  if (loading) return <div>Loading news...</div>;
  if (!articles.length) return <div>No news found. Add some preferences first!</div>;

  return (
    <div>
      <h2>Your News Feed</h2>
      {articles.map((article, index) => (
        <div key={index} style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h3>{article.title}</h3>
          </a>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
