import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import './Traffic.css'
import Header from '../Header/Header'
const Traffic = () => {
  return (
    <>
      <Header />

      <div>
        <h1>Traffic Signals & Rules</h1>

        <div class="rule-box">
          <div class="card">
            <div class="signal red"></div>
            <p>
              <strong>RED – STOP:</strong> All vehicles must halt for safety.
            </p>
          </div>

          <div class="card">
            <div class="signal yellow"></div>
            <p>
              <strong>YELLOW – READY:</strong> Slow down and prepare to stop.
            </p>
          </div>

          <div class="card">
            <div class="signal green"></div>
            <p>
              <strong>GREEN – GO:</strong> Move ahead if the road is clear.
            </p>
          </div>

          <div class="card">
            <p>
              Always wear a <strong>helmet</strong> and{' '}
              <strong>seatbelt</strong>.
            </p>
          </div>

          <div class="card">
            <p>
              Avoid using <strong>mobile phones</strong> while driving.
            </p>
          </div>

          <div class="card">
            <p>
              Follow <strong>lane discipline</strong> and speed limits.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Traffic
