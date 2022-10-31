import React, { useState } from 'react'
import './SortingVisualizer.css'
import { bubbleSort, selectionSort, quickSort, mergeSort } from './sorts'

const SortingVisualizer = () => {
  const arrSize = 50
  const delay = 50

  const [array, setArray] = useState(Array.from({ length: arrSize }, () => Math.floor(Math.random() * 500)))

  // creates a new array.
  const resetArray = () => {
    const arr = Array.from({ length: arrSize }, () => Math.floor(Math.random() * 500))
    setArray(arr)
  }

  // renders the array.
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

  function swap (a, b) {
    const arr = array;
    [arr[a], arr[b]] = [arr[b], arr[a]]
    setArray([...arr])
  }

  const sortSelectionSort = async () => {
    const sorted = await selectionSort(array, swap, delay)
    setArray([...sorted])
    console.log(array)
  }
  const sortBubbleSort = async () => {
    const sorted = await bubbleSort(array, swap, delay)
    setArray([...sorted])
  }
  const sortQuickSort = () => {
    const sorted = quickSort(array)
    setArray(sorted)
    console.log(array)
  }
  const sortMergeSort = () => {
    const sorted = mergeSort(array)
    setArray(sorted)
    console.log(array)
  }

  return (
    <>
      <button onClick={resetArray}> Reset </button>
      <button onClick={sortBubbleSort}> Bubble sort </button>
      <button onClick={sortSelectionSort}> Selection sort </button>
      <button onClick={sortQuickSort}> Quick sort </button>
      <button onClick={sortMergeSort}> Merge sort </button>

      <div className = "array-container">
        {arrayList()}
        </div>
      </>
  )
}

export default SortingVisualizer
