let quit = false

/**
 * makes the function wait for parameter milisec x duration.
 * @param {*} milisec
 *
 */
export function wait (milisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, milisec)
  })
}

/**
 * stopExec changes the value of quit and keeps it for one and a half second unitil swapping it back
 * in the sorting functions quit is checked in crucial parts and it ends the execution by pressing
 * the reset button.
 */
export const stopExec = async () => {
  quit = true
  await wait(1500)
  quit = false
}

/**
 * Sorting algorithm for bubbleSort. This also includes a way to display the happening motions with
 * the swap function.
 *
 * @param {*} arr
 * @param {*} swap
 * @param {*} delay
 */
export const bubbleSort = async (arr, swap, delay) => {
  const bars = document.querySelectorAll('.array-bar')
  // we go through every index and compare it with the next one. If its larger we swap the values.
  // Do this until the whole list is sorted.
  for (let i = 0; i < arr.length; i++) {
    for (let a = 0; a < (arr.length - 1 - i); a++) {
      // stop if reset has been pressed
      if (quit === true) break
      console.log(quit)
      // indicates the two values that are being compared
      bars[a].style.backgroundColor = 'red'
      bars[a + 1].style.backgroundColor = 'red'

      // slow down the comparision
      await wait(delay)

      if (arr[a] > arr[a + 1]) {
        if (quit === true) break
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
}

/**
 * Sorting algorithm form selectionsort. Displays the movements again with swap.
 *
 * @param {*} arr
 * @param {*} swap
 * @param {*} delay
 */
export const selectionSort = async (arr, swap, delay) => {
  const bars = document.querySelectorAll('.array-bar')
  // actual sorting algorithm
  for (let i = 0; i < arr.length; i++) {
    let min = i
    bars[min].style.backgroundColor = 'orange'
    // find the smallest index of the array
    for (let k = i + 1; k < arr.length; k++) {
      // stop if reset has been pressed
      if (quit === true) break
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
    if (quit === true) break
    // swap smallest value and index
    swap(i, min)
  }

  return arr
}
/**
 * for mergesort we will need two functions, merge and mergeSort together
 * merge will return inputed array sorted
 * mergeSort will split the original array and call it with recursion until it's sorted.
 *
 * This time visuals are created with .style.backgroung and .style.height which directly change the
 * values of the bars
 *
 * @param {*} arr
 * @param {*} l = left of the array
 * @param {*} m = middle of the array
 * @param {*} r = right of the array
 * @param {*} delay
 *
 */
const merge = async (arr, l, m, r, delay, refreshArray) => {
  const bars = document.querySelectorAll('.array-bar')

  console.log('Now merging')
  const n1 = m - l + 1
  const n2 = r - m
  const left = new Array(n1)
  const right = new Array(n2)

  // stop if reset has been pressed
  if (quit === true) return

  // loop for left array to fill it with the height of the bars. Also show the array which
  // is being compared at the moment with red
  for (let i = 0; i < n1; i++) {
    await wait(delay)
    if (quit === true) break
    console.log('left loop')
    bars[l + i].style.background = 'red'
    left[i] = bars[l + i].style.height
  }
  // same for right array and coloring it with orange
  for (let i = 0; i < n2; i++) {
    await wait(delay)
    if (quit === true) break
    console.log('right loop')
    bars[m + 1 + i].style.background = 'orange'
    right[i] = bars[m + 1 + i].style.height
  }
  await wait(delay)
  if (quit === true) return
  let i = 0; let j = 0; let k = l
  // while both arrays have values
  while (i < n1 && j < n2) {
    await wait(delay)
    if (quit === true) break
    console.log('in merge')

    // comparision coloring
    // color pink when array is finally sorted fully and green when part of array is sorted
    if (parseInt(left[i]) <= parseInt(right[j])) {
      if ((n1 + n2) === arr.length) {
        bars[k].style.background = 'pink'
      } else {
        bars[k].style.background = 'lightgreen'
      }
      // .style.height changes the visual of the array and arr[k] = left[i] changes the actual array
      // that cant be seen.
      bars[k].style.height = left[i]
      arr[k] = parseInt(left[i])
      i++; k++
    } else {
      if ((n1 + n2) === arr.length) {
        bars[k].style.background = 'pink'
      } else {
        bars[k].style.background = 'lightgreen'
      }
      bars[k].style.height = right[j]
      arr[k] = parseInt(right[j])
      j++; k++
    }
    refreshArray(arr)
  }
  if (quit === true) return
  // when right array is empty
  while (i < n1) {
    await wait(delay)
    if (quit === true) break
    // coloring
    if ((n1 + n2) === arr.length) {
      bars[k].style.background = 'pink'
    } else {
      bars[k].style.background = 'lightgreen'
    }
    bars[k].style.height = left[i]
    arr[k] = parseInt(left[i])
    i++; k++
  }
  // when left array is empty
  while (j < n2) {
    await wait(delay)
    if (quit === true) break
    // coloring
    if ((n1 + n2) === arr.length) {
      bars[k].style.background = 'pink'
    } else {
      bars[k].style.background = 'lightgreen'
    }
    bars[k].style.height = right[j]
    arr[k] = parseInt(right[j])
    j++; k++
  }
  refreshArray(arr)
}

export const mergeSort = async (arr, left, right, delay, refreshArray) => {
  if (quit === true) return
  // if there is only one in array
  if (left >= right) {
    return
  }
  // find the middle of the array and split it
  const middle = left + Math.floor((right - left) / 2)
  // create a split and two different mergeSorts and the merge the sorted arrays.
  await mergeSort(arr, left, middle, delay, refreshArray)
  await mergeSort(arr, middle + 1, right, delay, refreshArray)
  await merge(arr, left, middle, right, delay, refreshArray)
}

async function sorting (arr, left, right, swap, delay) {
  const bars = document.querySelectorAll('.array-bar')
  const pivot = left
  let i = pivot + 1

  // color the pivot
  bars[pivot].style.background = 'red'

  // loop through the array
  for (let j = i; j <= right; j++) {
    // stop if reset has been pressed
    if (quit === true) break
    bars[j].style.background = 'yellow'
    await wait(delay / 2)
    // check if the index we are looping is smaller than the pivot
    if (arr[j] < arr[pivot]) {
      // stop if reset has been pressed
      if (quit === true) break
      swap(i, j)
      bars[i].style.background = 'purple'
      if (i !== j) {
        bars[j].style.background = 'blue'
      }
      i++
      await wait(delay / 2)
    } else {
      bars[j].style.background = 'blue'
      await wait(delay / 2)
    }
  }
  if (quit === true) return
  i--
  swap(pivot, i)
  bars[i].style.background = 'red'
  bars[pivot].style.background = 'green'
  for (let k = 0; k <= right; k++) {
    if (bars[k].style.background !== 'red') {
      bars[k].style.background = 'green'
    }
  }
  wait(delay)
  return i
}

/**
 * Quick sort uses also two functions for the sort. sorting does the actual sorting and quicksort
 * creates the recursive calling. This time we use swap again.
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 * @param {*} swap
 * @param {*} delay
 */
export const quickSort = async (arr, left, right, swap, delay) => {
  const bars = document.querySelectorAll('.array-bar')
  if (left < right) {
    if (quit === true) return
    const pivot = await sorting(arr, left, right, swap, delay)
    await quickSort(arr, left, pivot - 1, swap, delay)
    await quickSort(arr, pivot + 1, right, swap, delay)
  } else if (left >= 0 && right >= 0 && left < arr.length && right < arr.legth) {
    if (quit === true) return
    bars[right].style.background = 'pink'
    bars[left].style.background = 'pink'
  }
}
