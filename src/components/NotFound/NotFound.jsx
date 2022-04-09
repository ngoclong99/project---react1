/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useNavigate } from 'react-router-dom'

NotFound.propTypes = {}

function NotFound(props) {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <div className="container text-center">
      <div className="logo-404">
        <a onClick={() => handleBackToHome()}>
          <img src={require('../../asset/images/home/logo.png')} alt="" />
        </a>
      </div>
      <div className="content-404">
        <img src={require('../../asset/images/404/404.png')} className="img-responsive" alt="" />
        <h1>
          <b>OPPS!</b> We Couldn’t Find this Page
        </h1>
        <p>Uh... So it looks like you brock something. The page you are looking for has up and Vanished.</p>
        <h2>
          <a onClick={() => handleBackToHome()}>Bring me back Home</a>
        </h2>
      </div>
    </div>
  )
}

export default NotFound
