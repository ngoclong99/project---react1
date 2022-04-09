function uptoStringFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
function checkDuplicateImg(array, name) {
  const index = array.findIndex((o, index) => {
    return o.name === name
  })
  return index === -1 ? false : true
}
function formatUSD(monney) {
  return monney?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    useGrouping: true,
    maximumSignificantDigits: 3
  })
}
function replaceImgs(str) {
  return JSON.parse(str)
}

export { uptoStringFirst, checkDuplicateImg, formatUSD, replaceImgs }
