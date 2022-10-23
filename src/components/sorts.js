
const bubbleSort = (arr) => {
  // we go through every index and compare it with the next one. If its larger we swap the values.
  // Do this until the whole list is sorted.
  arr.forEach(() => {
    for (let a = 0; a < (arr.length - 1); a++) {
      if (arr[a] > arr[a + 1]) {
        // swap values if a + 1 > a
        [arr[a], arr[a + 1]] = [arr[a + 1], arr[a]]
      }
    }
  })
  return arr
}

const selectionSort = (arr) => {
  // actual sorting algorithm
  for (let i = 0; i < arr.length; i++) {
    const sliced = arr.slice(i)

    // finds the smallest value and the index of it. slice makes sure the values that have been sorted dont appear.
    const smallestIndex = sliced.indexOf((Math.min(...sliced))) + i;

    // swap smallest value and index
    [arr[i], arr[smallestIndex]] = [arr[smallestIndex], arr[i]]
  }

  return arr
}

const quickSort = (arr) => {
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
  return quickSort(left).concat(pivot, quickSort(right))
}

// for mergesort we will need two functions, merge and mergeSort together
// merge will return inputed array sorted
// mergeSort will split the original array and call it with recursion until it's sorted.
const mergeSort = (arr) => {
  // stop the recursion if leftover array is under 2 in length
  if (arr.length < 2) { return arr }
  // split the array from the middle. Now left side is called left and the origina array is split in half (right)
  const left = arr.splice(0, arr.length / 2)

  // finally recursively call left side of array so it will split it again and again until it's finished.
  // also calls right side and then does the whole loop again until right side is also under 2 in legth.
  // uses also now merge which will sort the arrays itself, when the arrays are returned

  return merge(mergeSort(left), mergeSort(arr))
}

const merge = (left, right) => {
  // takes in two components, left and right and these together are the original array.
  const arr = []

  // loop until left or right side of array is clear.
  while (left.length && right.length) {
    // compare the first indexes in both arrays, shift will remove the first array and push it to the sorted array
    left[0] < right[0] ? arr.push(left.shift()) : arr.push(right.shift())
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
// }

module.exports = {
  bubbleSort,
  selectionSort,
  quickSort,
  mergeSort
}
