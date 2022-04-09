import React from 'react'
import PropTypes from 'prop-types'

CompanyProfile.propTypes = {
  profile: PropTypes.string
}

function CompanyProfile(props) {
  const { profile } = props

  return (
    <div className="tab-pane " id="companyprofile">
      CompanyProfile: {profile}
    </div>
  )
}

export default CompanyProfile
