import React, { useState } from 'react'

const SortingVisualizer = () => {

    const [array, setArray] = useState([3])

    //creates a new array.
    const resetArray = () => {
        const array = Array.from({length: 1000}, () => Math.floor(Math.random() * 40));
        console.log(array)
        setArray(array)
    }

    //returns unsorted array.
    const arrayList = (array) => {
        return (
            array.map((value, index) => 
                <div className = "array-bar" key = {index}> {value}</div>
            )
        )}

    return (
        <>
            <button onClick={resetArray}> Reset </button> 
            {arrayList(array)}
        </>
    )}

export default SortingVisualizer