import React from 'react'

/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
  return (
    <div className="error" id="errorMessage">
    {message}
  </div>
  )
}

export default Notification
