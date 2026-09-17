import React from 'react'
import './BMC.css'
import Header from '../Header/Header'
const BMC = () => {
  return (
    <>
      <Header />

      <div>
        <h1 className="bmc">Bhopal Municipal Corporation (BMC)</h1>

        <div class="content">
          <h2>About BMC</h2>
          <p>
            The Bhopal Municipal Corporation (BMC) is responsible for delivering
            essential civic services, maintaining city infrastructure, and
            ensuring the overall development of Bhopal.
          </p>

          <h2>Key Responsibilities</h2>
          <ul>
            <li>Water supply management</li>
            <li>Waste collection and disposal</li>
            <li>Road and streetlight maintenance</li>
            <li>Public health and sanitation</li>
            <li>Urban planning and building regulation</li>
            <li>Environmental sustainability programs</li>
          </ul>

          <h2>Citizen Services</h2>
          <p>
            BMC provides services such as property tax payment, birth and death
            certificates, grievance redressal, and updates on development
            projects through both online and offline modes.
          </p>
        </div>
      </div>
    </>
  )
}

export default BMC
