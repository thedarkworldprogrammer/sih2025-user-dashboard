import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="project-title-bar">
      <img
        onClick={() => navigate('/')}
        src={Logo}
        alt=""
        style={{ cursor: 'pointer' }}
      />
      <h1 id="head-logo">
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Citizen Report
        </span>
      </h1>
    </div>
  )
}

export default Header
