"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

// Pages
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Jobs from "./pages/Jobs"
import Connections from "./pages/Connections"
import Navbar from "./components/Navbar"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn")
    if (loggedIn === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false")
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile/:username" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/jobs" element={isLoggedIn ? <Jobs /> : <Navigate to="/login" />} />
          <Route path="/connections" element={isLoggedIn ? <Connections /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

