import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import SavedArticles from "./components/SavedArticles";
import Preferences from "./components/Preferences";
import NewsFeed from "./components/NewsFeed";
import api, { setAuthToken } from "./api";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [activeSection, setActiveSection] = useState("news"); // default section
  const [userPreferences, setUserPreferences] = useState([]);

  // Check if user has a valid JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);

      // Test token validity by calling a protected endpoint
      api.get("preferences/")
        .then((res) => {
          setLoggedIn(true);
          setUserPreferences(res.data.map(p => p.category));
        })
        .catch(() => {
          localStorage.removeItem("token");
          setLoggedIn(false);
        })
        .finally(() => setCheckingToken(false));
    } else {
      setCheckingToken(false);
    }
  }, []);

  if (checkingToken) return <div>Loading...</div>;

  // Not logged in
  if (!loggedIn) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Welcome to UrNews</h1>
        <Register onRegister={() => alert("Registered! Please login")} />
        <hr />
        <Login onLoginSuccess={() => setLoggedIn(true)} />
      </div>
    );
  }

  // Logged in
  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Personalized News</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveSection("news")}>News Feed</button>
        <button onClick={() => setActiveSection("saved")}>Saved Articles</button>
        <button onClick={() => setActiveSection("preferences")}>Preferences</button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setAuthToken(null);
            setLoggedIn(false);
          }}
          style={{ marginLeft: "20px" }}
        >
          Logout
        </button>
      </div>

      <div>
        {activeSection === "news" && <NewsFeed preferences={userPreferences} />}
        {activeSection === "saved" && <SavedArticles />}
        {activeSection === "preferences" && (
          <Preferences
            onUpdate={(updatedPrefs) =>
              setUserPreferences(updatedPrefs.map(p => p.category))
            }
          />
        )}
      </div>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import SavedArticles from "./components/SavedArticles";
// import Preferences from "./components/Preferences";
// import NewsFeed from "./components/NewsFeed";
// import api, { setAuthToken } from "./api";

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [checkingToken, setCheckingToken] = useState(true);
//   const [preferences, setPreferences] = useState([]); // store user preferences

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setAuthToken(token);

//       // Test token validity and fetch preferences
//       api.get("preferences/")
//         .then((res) => {
//           setLoggedIn(true);
//           setPreferences(res.data.map((p) => p.category)); // extract categories
//         })
//         .catch(() => {
//           localStorage.removeItem("token");
//           setLoggedIn(false);
//         })
//         .finally(() => setCheckingToken(false));
//     } else {
//       setCheckingToken(false);
//     }
//   }, []);

//   if (checkingToken) return <div>Loading...</div>;

//   if (!loggedIn) {
//     return (
//       <div>
//         <h1>Welcome to UrNews</h1>
//         <Register onRegister={() => alert("Registered! Please login")} />
//         <hr />
//         <Login onLoginSuccess={() => setLoggedIn(true)} />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Your Personalized News</h1>
//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           setAuthToken(null);
//           setLoggedIn(false);
//         }}
//       >
//         Logout
//       </button>

//       {/* Pass preferences to NewsFeed */}
//       <NewsFeed preferences={preferences} />

//       <Preferences />
//       <SavedArticles />
//     </div>
//   );
// }

// export default App;
