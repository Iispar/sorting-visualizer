import React, { useEffect, useState } from 'react'
import './SortingVisualizer.css'
import { bubbleSort, selectionSort, quickSort, mergeSort } from './sorts'

const SortingVisualizer = () => {

    const [array, setArray] = useState(Array.from({length: 50}, () => Math.floor(Math.random() * 500)))


    //creates a new array.
    const resetArray = () => {
        const arr = Array.from({length: 50}, () => Math.floor(Math.random() * 500))
        setArray(arr)
    }

    //returns unsorted array.
    const arrayList = () => {
        return (
            array.map((value, index) => 
                <div 
                    className = "array-bar" 
                    key = {index}
                    style = {{height: `${value}px`}}
                    >
                </div>
            )
        )}

    const sortArray = () => {
        const sorted = selectionSort(array)
        setArray(sorted)
        console.log(array)
    }

    return (
        <>
            <button onClick={resetArray}> Reset </button>
            <button onClick={sortArray}> Sort </button>  

            <div className = "array-container">
                {arrayList()}
            </div>
        </>
    )}

export default SortingVisualizer
