import React from 'react'
/* eslint-disable react/prop-types */

const ArrayList = ({ array }) => {
  /**
  * renders the array
  */
  const arrayList = () => {
    return (
      array.map((value, index) =>
          <div
            className = "array-bar"
            key = {index}
            style = {{ height: `${value}px` }}
            >
          </div>
      )
    )
  }

  return (
    <div className = "array-container">
        {arrayList()}
    </div>
  )
}

export default ArrayList
