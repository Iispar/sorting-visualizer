import React, { useState } from 'react'
import './SortingVisualizer.css'
import { bubbleSort, selectionSort, quickSort, mergeSort, stopExec, wait } from './sorts'

let delay = 50
let arrSize = 50

const SortingVisualizer = () => {
  window.onload = function () {
    arrSize = document.querySelector('#sizeSlider').value
    const arrSizeSlider = document.querySelector('#sizeSlider')
    arrSizeSlider.addEventListener('input', function () {
      arrSize = document.querySelector('#sizeSlider').value
      setArray(Array.from({ length: arrSize }, () => Math.floor(Math.random() * 500)))
    })

    const delaySlider = document.querySelector('#speedSlider')
    delaySlider.addEventListener('input', function () {
      delay = 250 - document.querySelector('#speedSlider').value
    })
  }

  console.log(delay)

  const [array, setArray] = useState(Array.from({ length: arrSize }, () => Math.floor(Math.random() * 500)))
  /**
   * Stops the exectuion that is happening at the moment and then creates a new random array
   */
  const resetArray = async () => {
    const bars = document.querySelectorAll('.array-bar')
    // window.location.reload()
    stopExec()
    await wait(100)
    const arr = Array.from({ length: arrSize }, () => Math.floor(Math.random() * 500))
    // color the array back to normal color incase the array is sorted.
    for (let i = 0; i < arr.length; i++) {
      bars[i].style.background = 'green'
    }
    setArray(arr)
  }

  // const pauseArray = () => {
  // TODO: If want to
  // }

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
      return <h1> Sorted </h1>
    }
  }

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

  /**
   * swaps two values in the array. Used in the algorithms to display changes.
   */
  function swap (a, b) {
    const arr = array;
    [arr[a], arr[b]] = [arr[b], arr[a]]
    setArray([...arr])
  }
  const sortBubbleSort = async () => {
    await bubbleSort(array, swap, delay)
  }
  const sortSelectionSort = async () => {
    await selectionSort(array, swap, delay)
  }
  const sortQuickSort = async () => {
    await quickSort(array, 0, parseInt(array.length) - 1, swap, delay)
  }
  const sortMergeSort = () => {
    mergeSort(array, 0, parseInt(array.length) - 1, delay)
  }

  return (
    <>
      <button onClick={resetArray}> Reset </button>
      <button onClick={sortBubbleSort}> Bubble sort </button>
      <button onClick={sortSelectionSort}> Selection sort </button>
      <button onClick={sortQuickSort}> Quick sort </button>
      <button onClick={sortMergeSort}> Merge sort </button>

      <div className="slidecontainer">
      <p> Size </p>
        <input type="range" min="10" max="80" defaultValue="50" className="slider" id="sizeSlider" step="5"></input>
      <p> Speed </p>
        <input type="range" min="10" max="200" defaultValue="50" className="slider" id="speedSlider" step="5"></input>
      </div>

      <div className = "array-container">
        {arrayList()}
      </div>
      <div>
        {checkArray()}
      </div>
      </>
  )
}

export default SortingVisualizer
