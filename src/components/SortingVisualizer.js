import React, { useState } from 'react'
import './SortingVisualizer.css'
import { bubbleSort, selectionSort, quickSort, mergeSort, stopExec, wait } from './sorts'

let delay = 150
let arrSize = 50
let execution = false

const SortingVisualizer = () => {
  window.onload = function () {
    arrSize = document.querySelector('#sizeSlider').value
    const arrSizeSlider = document.querySelector('#sizeSlider')
    arrSizeSlider.addEventListener('input', function () {
      arrSize = arrSizeSlider.value
      setArray(Array.from({ length: arrSize }, () => Math.floor(Math.random() * 500)))
    })

    const delaySlider = document.querySelector('#speedSlider')
    delaySlider.addEventListener('input', function () {
      delay = 250 - delaySlider.value
    })

    const buttonContainer = document.querySelector('#button-container')
    buttonContainer.addEventListener('click', checkExecution, false)

    const slidecontainer = document.querySelector('#slide-container')
    slidecontainer.addEventListener('click', checkExecution, false)
  }

  const [array, setArray] = useState(Array.from({ length: arrSize }, () => Math.floor(Math.random() * 500)))

  const checkExecution = () => {
    console.log(execution)
    if (execution) {
      alert('stop')
    }
  }

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
    execution = false
    enableActions()
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
      return <p> The array is sorted </p>
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

  function disableActions () {
    execution = true
    document.querySelector('#sizeSlider').disabled = true
    document.querySelector('#speedSlider').disabled = true
  }

  function enableActions () {
    execution = false
    document.querySelector('#sizeSlider').disabled = false
    document.querySelector('#speedSlider').disabled = false
  }

  const sortBubbleSort = async () => {
    if (!execution) {
      disableActions()
      await bubbleSort(array, swap, delay)
      enableActions()
    }
  }
  const sortSelectionSort = async () => {
    if (!execution) {
      disableActions()
      await selectionSort(array, swap, delay)
      disableActions()
    }
  }
  const sortQuickSort = async () => {
    if (!execution) {
      disableActions()
      await quickSort(array, 0, parseInt(array.length) - 1, swap, delay)
      disableActions()
    }
  }
  const sortMergeSort = () => {
    if (!execution) {
      disableActions()
      mergeSort(array, 0, parseInt(array.length) - 1, delay)
      disableActions()
    }
  }

  return (
    <div className="grid-container">
      <div className="header-container">
        <div className="error-container">
          <button onClick={resetArray} id="resetButton" className="reset-button"> Reset </button>
        </div>

        <div className="button-container" id="button-container">
          <button onClick={sortBubbleSort} id="bubbleSortButton" className="array-button">
            <span> Bubble Sort </span>
          </button>
          <button onClick={sortSelectionSort} id="selectionSortButton" className="array-button">
            <span> Selection Sort </span>
          </button>
          <button onClick={sortQuickSort} id="quickSortButton" className="array-button">
            <span> Quick Sort </span>
          </button>
          <button onClick={sortMergeSort} id="mergeSortButton" className="array-button">
            <span> Merge Sort </span>
          </button>
        </div>

        <div className="slide-container" id="slide-container">
          <div className="sizeSliderContainer">
            <input type="range" min="10" max="150" defaultValue="50" className="slider" id="sizeSlider" step="5"></input>
            <div className="sizeSliderCaption">
              <p> Size </p>
            </div>
          </div>
          <div className="speedSliderContainer">
            <input type="range" min="10" max="200" defaultValue="100" className="slider" id="speedSlider" step="5"></input>
            <div className="speedSliderCaption">
              <p> Speed </p>
            </div>
          </div>
        </div>
      </div>

      <div className = "array-container">
        {arrayList()}
      </div>
      <div className = "footer-container">
        {checkArray()}
      </div>
    </div>
  )
}

export default SortingVisualizer
