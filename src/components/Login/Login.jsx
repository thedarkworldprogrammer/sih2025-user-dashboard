import React, { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { auth } from '../../firebase'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import HeroImg from '../../assets/hero.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [showPassword, setShowPassword] = useState(false) // New state for password visibility
  const navigate = useNavigate()

  useEffect(() => {
    if (showOtpForm) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved
          },
        }
      )
    }
  }, [showOtpForm])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('User logged in successfully!')
      navigate('/')
    } catch (err) {
      console.error('Error logging in:', err.message)
      setError(err.message)
      setMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address to reset your password.')
      setMessage('')
      return
    }
    setIsLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage('Password reset email sent! Please check your inbox.')
      setError('')
    } catch (err) {
      console.error('Error sending reset email:', err.message)
      setError(err.message)
      setMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const appVerifier = window.recaptchaVerifier
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      setConfirmationResult(result)
      setShowOtpForm(true)
      setMessage('OTP sent successfully! Please enter it below.')
    } catch (err) {
      console.error('Error sending OTP:', err.message)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp)
        console.log('OTP verified successfully!')
        navigate('/')
      }
    } catch (err) {
      console.error('Error verifying OTP:', err.message)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div id="recaptcha-container"></div>

      {!showOtpForm ? (
        <form onSubmit={handleLogin} className="auth-form">
          <h2>Login</h2>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <div className="forgot-password-link-container">
            <span
              onClick={handlePasswordReset}
              className="forgot-password-link"
            >
              Forgot Password?
            </span>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSendOtp} className="auth-form">
          <h2>Login with Phone</h2>
          {!confirmationResult ? (
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., +919876543210"
              required
            />
          ) : (
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          )}
          <button
            type="submit"
            disabled={isLoading}
            onClick={!confirmationResult ? handleSendOtp : handleVerifyOtp}
          >
            {isLoading
              ? 'Loading...'
              : confirmationResult
              ? 'Verify OTP'
              : 'Send OTP'}
          </button>
          <p>
            <span onClick={() => setShowOtpForm(false)} className="back-link">
              Back to Email Login
            </span>
          </p>
        </form>
      )}
    </div>
  )
}

export default Login
