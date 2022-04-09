function test(arr) {
  const result = {}
  for (let item of arr) {
    console.log(result[item.id])
    if (result[item.id]) {
      result[item.id].push(item)
    } else {
      result[item.id] = [item]
    }
  }
  return Object.values(result)
}

console.log(
  test([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 3, value: 0 }
  ])
)
