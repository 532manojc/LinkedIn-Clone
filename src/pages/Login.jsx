"use client"

import { useState } from "react"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // Since this is just UI, we'll accept any input
    onLogin()
  }

  return (
    <div className="container login-container">
      <div className="login-logo">
        <span style={{ color: "#0a66c2" }}>Linked</span>
        <span style={{ backgroundColor: "#0a66c2", color: "white", padding: "0 4px", borderRadius: "2px" }}>in</span>
      </div>

      <h4 className="text-center mb-4">Sign in</h4>
      <p className="text-center text-muted mb-4">Stay updated on your professional world</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Sign in
        </button>
      </form>

      <p className="text-center mt-4">
        New to LinkedIn?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onLogin()
          }}
        >
          Join now
        </a>
      </p>
    </div>
  )
}

export default Login

