"use client"

import { useState, useEffect } from "react"
import { Bookmark, MapPin, Search } from "react-feather"
import jobsData from "../data/jobs.json"

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState(null)
  const [savedJobs, setSavedJobs] = useState({})

  useEffect(() => {
    // Load jobs from JSON
    setJobs(jobsData)

    // Load saved jobs from localStorage
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || {}
    setSavedJobs(saved)
  }, [])

  const handleSaveJob = (jobId) => {
    const updatedSavedJobs = { ...savedJobs }

    if (updatedSavedJobs[jobId]) {
      delete updatedSavedJobs[jobId]
    } else {
      updatedSavedJobs[jobId] = true
    }

    setSavedJobs(updatedSavedJobs)
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs))
  }

  const handleJobClick = (job) => {
    setSelectedJob(job)
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container" style={{ marginTop: "80px", paddingBottom: "30px" }}>
      <div className="row">
        <div className="col-12 mb-4 x">
          <div className="card">
            <div className="card-body">
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search jobs by title, company, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5 col-lg-4">
          <h5 className="mb-3">Job Listings</h5>

          {filteredJobs.length === 0 ? (
            <p>No jobs found matching your search.</p>
          ) : (
            filteredJobs.map((job) => (
              <div
                className={`card job-card mb-3 ${selectedJob && selectedJob.id === job.id ? "border-primary" : ""}`}
                key={job.id}
                onClick={() => handleJobClick(job)}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <img
                        src={"/images/6job.png?height=60&width=60"}
                        alt={job.company}
                        className="company-logo me-3"
                      />
                      <div>
                        <h5>{job.title}</h5>
                        <h6>{job.company}</h6>
                        <div className="d-flex align-items-center text-muted">
                          <MapPin size={14} className="me-1" />
                          <small>{job.location}</small>
                        </div>
                      </div>
                    </div>
                    <button
                      className={`btn btn-sm ${savedJobs[job.id] ? "btn-primary" : "btn-outline-primary"}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSaveJob(job.id)
                      }}
                    >
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-md-7 col-lg-8">
          {selectedJob ? (
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div className="d-flex">
                    <img
                      src={selectedJob.companyLogo || "/placeholder.svg?height=80&width=80"}
                      alt={selectedJob.company}
                      className="company-logo me-3"
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div>
                      <h4>{selectedJob.title}</h4>
                      <h5>{selectedJob.company}</h5>
                      <div className="d-flex align-items-center text-muted">
                        <MapPin size={16} className="me-1" />
                        {selectedJob.location}
                      </div>
                      <div className="mt-2">
                        <span className="badge bg-light text-dark me-2">{selectedJob.employmentType}</span>
                        <span className="badge bg-light text-dark">{selectedJob.experienceLevel}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`btn ${savedJobs[selectedJob.id] ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => handleSaveJob(selectedJob.id)}
                  >
                    <Bookmark size={16} className="me-1" />
                    {savedJobs[selectedJob.id] ? "Saved" : "Save Job"}
                  </button>
                </div>

                <div className="mb-4">
                  <h5>Job Description</h5>
                  <p>{selectedJob.description}</p>
                </div>

                <div className="mb-4">
                  <h5>Requirements</h5>
                  <ul>
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h5>Responsibilities</h5>
                  <ul>
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary">Apply Now</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-center text-muted">
                <h5>Select a job to view details</h5>
                <p>Click on any job listing to see more information</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs

