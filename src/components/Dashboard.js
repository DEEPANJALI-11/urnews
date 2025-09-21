import React, { useState } from "react";
import SavedArticles from "./SavedArticles";
import Preferences from "./Preferences";
// import NewsFeed from "./NewsFeed"; // later, for personalized news

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("saved"); // default section

  return (
    <div>
      <h1>Welcome to UrNews</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveSection("saved")}>Saved Articles</button>
        <button onClick={() => setActiveSection("preferences")}>Preferences</button>
        {/* <button onClick={() => setActiveSection("feed")}>News Feed</button> */}
      </div>

      <div>
        {activeSection === "saved" && <SavedArticles />}
        {activeSection === "preferences" && <Preferences />}
        {/* {activeSection === "feed" && <NewsFeed />} */}
      </div>
    </div>
  );
};

export default Dashboard;
