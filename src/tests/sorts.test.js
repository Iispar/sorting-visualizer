const sorts = require('../components/sorts')

test('array is random', () => {
  const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500))
  const arr2 = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500))
  const arr3 = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500))
  expect(arr).not.toStrictEqual(arr2)
  expect(arr2).not.toStrictEqual(arr3)
})

test('quick sort works', () => {
  const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500))
  const copy = arr.slice()
  const result = sorts.quickSort(arr)
  const sorted = copy.sort(function (a, b) { return a - b })

  expect(result).toStrictEqual(sorted)
})

test('bubble sort works', () => {
  const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500))
  const copy = arr.slice()
  const result = sorts.bubbleSort(arr)
  const sorted = copy.sort(function (a, b) { return a - b })

  expect(result).toStrictEqual(sorted)
})

test('merge sort works', () => {
  const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500))
  const copy = arr.slice()
  const sorted = copy.sort(function (a, b) { return a - b })
  const result = sorts.mergeSort(arr)

  expect(result).toStrictEqual(sorted)
})

test('selection sort works', () => {
  const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500))
  const copy = arr.slice()
  const result = sorts.selectionSort(arr)
  const sorted = copy.sort(function (a, b) { return a - b })

  expect(result).toStrictEqual(sorted)
})
