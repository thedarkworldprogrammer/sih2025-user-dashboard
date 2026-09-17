import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AllComplaints.css'

const API_BASE_URL =
  'https://civic-reporting-system-g61y.onrender.com'

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${API_BASE_URL}/api/complaints/all/`
        )

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`)
        }

        const data = await response.json()

        setComplaints(data.complaints || [])
      } catch (err) {
        console.error('Error fetching complaints:', err)
        setError('Unable to load complaints. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  const getImageUrl = (image) => {
    if (!image) return null

    if (image.startsWith('http')) {
      return image
    }

    return `${API_BASE_URL}${image}`
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'

    return new Date(date).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <div className="all-complaints-page">

      {/* Header */}
      <div className="all-complaints-header">
        <button
          className="complaints-back-button"
          onClick={() => navigate('/')}
        >
          ←
        </button>

        <h2>All Complaints</h2>
      </div>

      {/* Content */}
      <div className="complaints-content">

        {loading && (
          <div className="complaints-loading">
            <div className="loading-spinner-circle"></div>
            <p>Loading complaints...</p>
          </div>
        )}

        {!loading && error && (
          <div className="complaints-error">
            <p>{error}</p>

            <button
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && complaints.length === 0 && (
          <div className="no-complaints">
            <div className="no-complaints-icon">📭</div>
            <h3>No complaints found</h3>
            <p>There are no complaints registered yet.</p>
          </div>
        )}

        {!loading && !error && complaints.length > 0 && (
          <>
            <div className="complaints-count">
              Total Complaints: <strong>{complaints.length}</strong>
            </div>

            <div className="complaints-list">

              {complaints.map((complaint) => {
                const imageUrl = getImageUrl(complaint.image)

                return (
                  <div
                    className="complaint-card"
                    key={complaint.id}
                  >

                    {/* Image */}
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={complaint.title || 'Complaint'}
                        className="complaint-image"
                      />
                    ) : (
                      <div className="complaint-no-image">
                        📷
                        <span>No image</span>
                      </div>
                    )}

                    {/* Details */}
                    <div className="complaint-details">

                      <div className="complaint-top-row">
                        <span className="complaint-id">
                          Complaint #{complaint.id}
                        </span>

                        <span
                          className={`complaint-status ${String(
                            complaint.status || ''
                          ).toLowerCase()}`}
                        >
                          {complaint.status || 'Pending'}
                        </span>
                      </div>

                      <h3>
                        {complaint.title || 'Untitled Complaint'}
                      </h3>

                      <p className="complaint-description">
                        {complaint.description ||
                          'No description provided.'}
                      </p>

                      <div className="complaint-info">

                        <div>
                          <span>👍</span>
                          <strong>{complaint.votes || 0}</strong>
                          {' '}votes
                        </div>

                        <div>
                          <span>🏢</span>
                          {complaint.department || 'Department not assigned'}
                        </div>

                        <div>
                          <span>📍</span>
                          {complaint.latitude &&
                          complaint.longitude
                            ? `${complaint.latitude}, ${complaint.longitude}`
                            : 'Location not available'}
                        </div>

                        <div>
                          <span>🕒</span>
                          {formatDate(complaint.created_at)}
                        </div>

                      </div>

                    </div>
                  </div>
                )
              })}

            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default AllComplaints