function wait (milisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, milisec)
  })
}

export const bubbleSort = async (arr, swap, delay) => {
  const bars = document.querySelectorAll('.array-bar')
  // we go through every index and compare it with the next one. If its larger we swap the values.
  // Do this until the whole list is sorted.
  for (let i = 0; i < arr.length; i++) {
    for (let a = 0; a < (arr.length - 1 - i); a++) {
      // indicates the two values that are being compared
      bars[a].style.backgroundColor = 'red'
      bars[a + 1].style.backgroundColor = 'red'

      // slow down the comparision
      await wait(delay)

      if (arr[a] > arr[a + 1]) {
        // swap values if a + 1 > a
        const b = a + 1
        // send values to swap function which displays the animation
        swap(a, b)
      }

      // change bars back to normal
      bars[a].style.backgroundColor = 'green'
      bars[a + 1].style.backgroundColor = 'green'
    }
  }
  return arr
}

export const selectionSort = async (arr, swap, delay) => {
  const bars = document.querySelectorAll('.array-bar')
  // actual sorting algorithm
  for (let i = 0; i < arr.length; i++) {
    let min = i
    bars[min].style.backgroundColor = 'orange'
    // find the smallest index of the array
    for (let k = i + 1; k < arr.length; k++) {
      bars[k].style.backgroundColor = 'red'
      await wait(delay)
      if (arr[k] < arr[min]) {
        bars[min].style.backgroundColor = 'green'
        min = k
        bars[min].style.backgroundColor = 'orange'
      } else {
        bars[k].style.backgroundColor = 'green'
      }
    }
    bars[min].style.backgroundColor = 'green'
    // swap smallest value and index
    swap(i, min)
  }

  return arr
}

export const quickSort = async (arr) => {
  // if the sort is finished return final array
  if (arr.length <= 1) {
    return arr
  }

  const left = []; const right = []
  // we always choose the first index as pivot
  const pivot = arr[0]

  // actual sorting. Depending on if the current value of the index is larger or smaller then the index
  // it gets pushed to it's responding array.
  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
  }

  // create a callback of sorting the left and right side until not neccesary
  return await quickSort(left).concat(pivot, quickSort(right))
}

// for mergesort we will need two functions, merge and mergeSort together
// merge will return inputed array sorted
// mergeSort will split the original array and call it with recursion until it's sorted.
export const mergeSort = async (arr, i) => {
//  const bars = document.querySelectorAll('.array-bar')
  // stop the recursion if leftover array is under 2 in length
  if (arr.length < 2) { i += 1; return arr }
  // split the array from the middle. Now left side is called left and the origina array is split in half (right)
  const middle = Math.ceil(arr.length / 2)
  const left = arr.splice(0, middle)

  // finally recursively call left side of array so it will split it again and again until it's finished.
  // also calls right side and then does the whole loop again until right side is also under 2 in legth.
  // uses also now merge which will sort the arrays itself, when the arrays are returned

  return merge(await mergeSort(left, i, middle), await mergeSort(arr, i, middle))
}

const merge = async (left, right, middle) => {
  const bars = document.querySelectorAll('.array-bar')
  // takes in two components, left and right and these together are the original array.
  const arr = []
  console.log(middle)

  // loop until left or right side of array is clear.
  while (left.length && right.length) {
    // compare the first indexes in both arrays, shift will remove the first array and push it to the sorted array
    left[0] < right[0] ? arr.push(left.shift()) : arr.push(right.shift())
    bars[0].style.backgroundColor = 'red'
    await wait(1000)
  }

  // if we didn't go through the left or right array we just push them to the end.
  return [...arr, ...left, ...right]
}

// funtion to measure the time to sort
// const time = (sort, arr, name) => {
//   var startTime = Date.now()

//   console.log(`final array: ${sort(arr)}`)
//   sort(arr)
//   var endTime = Date.now()
//   console.log(`${name} took ${endTime - startTime} milliseconds`)
//
