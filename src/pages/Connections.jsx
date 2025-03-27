"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserPlus, UserCheck, User, UserMinus } from "react-feather"
import userData from "../data/users.json"

function Connections() {
  const [connections, setConnections] = useState([])
  const [pendingConnections, setPendingConnections] = useState([])
  const [suggestedConnections, setSuggestedConnections] = useState([])

  useEffect(() => {
    // Load connections from localStorage
    const savedConnections = JSON.parse(localStorage.getItem("connections")) || []
    const savedPending = JSON.parse(localStorage.getItem("pendingConnections")) || []

    // Find user data for connections
    const connectionUsers = savedConnections.map((id) => userData.find((user) => user.id === id)).filter(Boolean)

    // Find user data for pending connections
    const pendingUsers = savedPending.map((id) => userData.find((user) => user.id === id)).filter(Boolean)

    setConnections(connectionUsers)
    setPendingConnections(pendingUsers)

    // Get suggested connections (exclude connections and pending)
    const allConnectionIds = [...savedConnections, ...savedPending, "johndoe"]
    const suggested = userData.filter((user) => !allConnectionIds.includes(user.id))
    setSuggestedConnections(suggested)
  }, [])

  const handleConnect = (userId) => {
    // Add to pending connections
    const updatedPending = [...pendingConnections.map((user) => user.id), userId]
    localStorage.setItem("pendingConnections", JSON.stringify(updatedPending))

    // Update UI
    const user = userData.find((u) => u.id === userId)
    if (user) {
      setPendingConnections([...pendingConnections, user])
      setSuggestedConnections(suggestedConnections.filter((u) => u.id !== userId))
    }
  }

  const handleAccept = (userId) => {
    // Remove from pending and add to connections
    const updatedPending = pendingConnections.filter((user) => user.id !== userId)
    const updatedConnections = [...connections, pendingConnections.find((user) => user.id === userId)]

    // Update localStorage
    localStorage.setItem("pendingConnections", JSON.stringify(updatedPending.map((user) => user.id)))
    localStorage.setItem("connections", JSON.stringify(updatedConnections.map((user) => user.id)))

    // Update UI
    setPendingConnections(updatedPending)
    setConnections(updatedConnections)
  }

  const handleRemoveConnection = (userId) => {
    // Remove from connections
    const updatedConnections = connections.filter((user) => user.id !== userId)

    // Update localStorage
    localStorage.setItem("connections", JSON.stringify(updatedConnections.map((user) => user.id)))

    // Add to suggested connections
    const removedUser = userData.find((u) => u.id === userId)
    if (removedUser) {
      setSuggestedConnections([...suggestedConnections, removedUser])
    }

    // Update UI
    setConnections(updatedConnections)
  }

  return (
    <div className="container" style={{ marginTop: "80px", paddingBottom: "30px" }}>
      <h4 className="mb-4">My Network</h4>

      {pendingConnections.length > 0 && (
        <div className="mb-5">
          <h5 className="mb-3">Pending Invitations ({pendingConnections.length})</h5>
          <div className="row">
            {pendingConnections.map((user) => (
              <div className="col-md-6 col-lg-4 mb-3" key={user.id}>
                <div className="card connection-card">
                  <div className="card-body">
                    <div className="d-flex">
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        className="profile-img me-3"
                        style={{ width: "60px", height: "60px" }}
                      />
                      <div>
                        <Link to={`/profile/${user.id}`} className="text-decoration-none">
                          <h6>{user.name}</h6>
                        </Link>
                        <p className="text-muted small mb-2">{user.headline}</p>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => handleAccept(user.id)}>
                          <UserCheck size={14} className="me-1" />
                          Accept
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">Ignore</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <h5 className="mb-3">My Connections ({connections.length})</h5>
        {connections.length === 0 ? (
          <p>You don't have any connections yet. Connect with people to grow your network.</p>
        ) : (
          <div className="row">
            {connections.map((user) => (
              <div className="col-md-6 col-lg-4 mb-3" key={user.id}>
                <div className="card connection-card">
                  <div className="card-body">
                    <div className="d-flex">
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        className="profile-img me-3"
                        style={{ width: "60px", height: "60px" }}
                      />
                      <div>
                        <Link to={`/profile/${user.id}`} className="text-decoration-none">
                          <h6>{user.name}</h6>
                        </Link>
                        <p className="text-muted small mb-2">{user.headline}</p>
                        <p className="text-muted small mb-2">
                          <User size={14} className="me-1" />
                          {user.connections} connections
                        </p>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveConnection(user.id)}
                        >
                          <UserMinus size={14} className="me-1" />
                          Remove Connection
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h5 className="mb-3">People You May Know</h5>
        <div className="row">
          {suggestedConnections.map((user) => (
            <div className="col-md-6 col-lg-4 mb-3" key={user.id}>
              <div className="card connection-card">
                <div className="card-body">
                  <div className="d-flex">
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt={user.name}
                      className="profile-img me-3"
                      style={{ width: "60px", height: "60px" }}
                    />
                    <div>
                      <Link to={`/profile/${user.id}`} className="text-decoration-none">
                        <h6>{user.name}</h6>
                      </Link>
                      <p className="text-muted small mb-2">{user.headline}</p>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleConnect(user.id)}>
                        <UserPlus size={14} className="me-1" />
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Connections

