import React from 'react'

/* eslint-disable react/prop-types */
/**
 * Creates a new message for an error.
 */
const Notification = ({ message }) => {
  return (
    <div className="error" id="errorMessage">
    {message}
  </div>
  )
}

export default Notification
