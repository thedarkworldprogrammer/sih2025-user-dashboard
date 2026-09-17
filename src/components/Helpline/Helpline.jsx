import React from 'react'
import { FaLeaf, FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import './Helpline.css'
import Header from '../Header/Header'
const Helpline = () => {
  return (
    <>
      <Header />
      <div>
        <h1 className="emergency">Emergency Helpline Numbers</h1>

        <div class="container">
          <div class="item">
            <span>Ambulance</span> <strong>108</strong>
          </div>
          <div class="item">
            <span>Police</span> <strong>100</strong>
          </div>
          <div class="item">
            <span>Fire Brigade</span> <strong>101</strong>
          </div>
          <div class="item">
            <span>Women Helpline</span> <strong>1091</strong>
          </div>
          <div class="item">
            <span>Child Helpline</span> <strong>1098</strong>
          </div>
          <div class="item">
            <span>Traffic Police</span> <strong>1095</strong>
          </div>
          <div class="item">
            <span>Disaster Management</span> <strong>1070</strong>
          </div>
        </div>
      </div>
    </>
  )
}

export default Helpline
