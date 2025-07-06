import React, { useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Dashboard from "./pages/Dashboard";

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "1234") {
      onLogin(true);
    } else {
      setError("Invalid credentials");
    }
  };

const addJob = (job) => {
  setJobs(prev => [...prev, { ...job, id: prev.length + 1 }]);
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center  overflow-hidden relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?fit=crop&w=1600&q=80')" }}>
      <div className="absolute bg-black bg-opacity-40 h-100vh"></div>
      <div className="relative max-w-sm w-full mx-auto p-6 bg-white bg-opacity-90 rounded shadow-lg backdrop-blur-md z-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded hover:scale-105 transition-transform"
          >
            Login
          </button>
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const sampleJobs = [
  { id: 1, title: "Frontend Developer", description: "Build UIs using React." },
  { id: 2, title: "Backend Developer", description: "Work with Node.js and databases." },
  { id: 3, title: "Full Stack Engineer", description: "Develop and maintain full-stack apps."}
];

const [jobs, setJobs] = useState(sampleJobs);

const addJob = (job) => {
  setJobs(prev => [...prev, { ...job, id: prev.length + 1 }]);
};

  const isLoginPage = location.pathname === "/login";

  // Use a subtle, professional background image
  const backgroundImageUrl =
    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')";

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed relative opacity-1"
      style={{ backgroundImage: backgroundImageUrl }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center">
        <div className={`w-full ${isLoggedIn ? "max-w-6xl p-6 space-y-6 bg-white/90 backdrop-blur-md rounded-lg shadow-xl text-center mt-8" : "p-4 mt-8"}`}>
          <h1 className="text-4xl font-bold text-blue-700 drop-shadow-md text-center">Job Board</h1>
          <nav className="flex justify-center gap-6 items-center my-4">
            <Link
              to="/"
              className="text-blue-700 hover:text-white hover:bg-blue-700 px-3 py-2 rounded transition-colors"
            >
              Home
            </Link>
            <Link
              to="/listings"
              className="text-blue-700 hover:text-white hover:bg-blue-700 px-3 py-2 rounded transition-colors"
            >
              Job Listings
            </Link>
            <Link
              to="/dashboard"
              className="text-blue-700 hover:text-white hover:bg-blue-700 px-3 py-2 rounded transition-colors"
            >
              Candidate Dashboard
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition-colors"
              >
                Logout
              </button>
            )}
          </nav>
          <div className="flex justify-center items-center">
            <Routes>
              <Route path="/" element={<Home  jobs={jobs} />} />
              <Route
                path="/listings"
                element={isLoggedIn ? <Listings jobs={jobs} /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={isLoggedIn ? <Dashboard jobs={jobs} addJob={addJob} /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={setIsLoggedIn} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}