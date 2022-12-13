import React from 'react'
/* eslint-disable react/prop-types */

const Footer = ({ array }) => {
  /**
   * Checks if array is sorted correctly.
   * .@post returns a visual of being sorted
   */
  const checkArray = () => {
    let broken = false

    for (let i = 1; i < array.length; i++) {
      if (array[i] < array[i - 1]) {
        broken = true
      }
    }
    if (!broken) {
      return <p> The array is now sorted </p>
    }
  }

  /**
   * Displays the array with an list.
   */
  const displayArray = () => {
    let items = ''
    for (let i = 0; i < array.length; i++) {
      items += `[${array[i]}] `
    }
    return items
  }

  return (
    <div className = "footer-container">
        {displayArray()}
        {checkArray()}
    </div>
  )
}

export default Footer
