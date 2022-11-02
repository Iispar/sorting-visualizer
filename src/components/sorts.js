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
const merge = async (arr, l, m, r, delay) => {
  const bars = document.querySelectorAll('.array-bar')
  console.log('Now merging')
  const n1 = m - l + 1
  const n2 = r - m
  const left = new Array(n1)
  const right = new Array(n2)

  for (let i = 0; i < n1; i++) {
    await wait(delay)
    console.log('left loop')
    bars[l + i].style.background = 'red'
  }
  for (let i = 0; i < n2; i++) {
    await wait(delay)
    console.log('right loop')
    bars[m + 1 + i].style.background = 'orange'
  }

  await wait(delay)
  let i = 0; let j = 0; let k = l
  while (i < n1 && j < n2) {
    await wait(delay)
    console.log('in merge')

    // comparision coloring
    if (parseInt(left[i] <= parseInt(right[j]))) {
      if ((n1 + n2) === arr.length) {
        bars[k].style.background = 'pink'
      } else {
        bars[k].style.background = 'lightgreen'
      }

      i++; k++
    } else {
      if ((n1 + n2) === arr.length) {
        bars[k].style.background = 'pink'
      } else {
        bars[k].style.background = 'lightgreen'
      }
      j++; k++
    }
  }
  while (i < n1) {
    await wait(delay)
    // color
    if ((n1 + n2) === arr.length) {
      bars[k].style.background = 'pink'
    } else {
      bars[k].style.background = 'lightgreen'
    }
    i++; k++
  }

  while (j < n2) {
    await wait(delay)
    if ((n1 + n2) === arr.length) {
      bars[k].style.background = 'pink'
    } else {
      bars[k].style.background = 'lightgreen'
    }
    j++; k++
  }
}

// eslint-disable-next-line no-unused-vars
export const mergeSort = async (arr, left, right) => {
  if (left >= right) {
    return
  }

  const middle = left + Math.floor((right - left) / 2)
  console.log('left: ' + left + ' right: ' + right + ' midlle: ' + middle)
  await mergeSort(arr, left, middle)
  await mergeSort(arr, middle + 1, right)
  await merge(arr, left, middle, right, 500)
}

// funtion to measure the time to sort
// const time = (sort, arr, name) => {
//   var startTime = Date.now()

//   console.log(`final array: ${sort(arr)}`)
//   sort(arr)
//   var endTime = Date.now()
//   console.log(`${name} took ${endTime - startTime} milliseconds`)
//
