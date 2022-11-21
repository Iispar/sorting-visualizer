import React, { useState } from 'react'
import './SortingVisualizer.css'
import { bubbleSort, selectionSort, quickSort, mergeSort, stopExec, wait } from './sorts'

let delay = 50
let arrSize = 50
let execution = false

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

    const buttonContainer = document.querySelector('#buttonContainer')
    buttonContainer.addEventListener('click', checkExecution, false)

    const slidecontainer = document.querySelector('#slidecontainer')
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
      enableActions()
    }
  }
  const sortQuickSort = async () => {
    if (!execution) {
      execution = true
      await quickSort(array, 0, parseInt(array.length) - 1, swap, delay)
      execution = false
    }
  }
  const sortMergeSort = () => {
    if (!execution) {
      execution = true
      mergeSort(array, 0, parseInt(array.length) - 1, delay)
      execution = false
    }
  }

  return (
    <>
      <button onClick={resetArray} id="resetButton"> Reset </button>
      <div id="buttonContainer">
        <button onClick={sortBubbleSort} id="bubbleSortButton"> Bubble sort </button>
        <button onClick={sortSelectionSort} id="selectionSortButton"> Selection sort </button>
        <button onClick={sortQuickSort} id="quickSortButton"> Quick sort </button>
        <button onClick={sortMergeSort} id="mergeSortButton"> Merge sort </button>
      </div>

      <div id="slidecontainer">
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
