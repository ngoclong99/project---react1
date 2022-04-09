import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormLogin from './components/FormLogin'
import FormRegister from './components/FormRegister'

TheLogin.propTypes = {}

function TheLogin(props) {
  return (
    <section id="form">
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1">
            <FormLogin />
          </div>
          <div className="col-sm-1">
            <h2 className="or">OR</h2>
          </div>
          <div className="col-sm-4">
            <FormRegister />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheLogin
