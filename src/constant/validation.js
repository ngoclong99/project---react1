const checkRequired = (value, key) => {
  return value.length !== 0 ? '' : `Please enter your ${key}`
}
const isEmail = (value) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(value) ? 'Please enter a valid email' : ''
}
const checkOnlyString = (value) => {
  const re = /^(?=.*[a-zA-Z])[a-zA-Z() ]+$/
  return !re.test(value) ? 'Please enter string ' : ''
}
const checkOnlyNumber = (value) => {
  const re = /^[0-9]+$/
  return !re.test(value) ? 'Please enter number' : ''
}
const checkNumberNot0 = (value) => {
  const re = /^[1-9][0-9]+$/
  return !re.test(value) ? 'Please enter a valid amount ( not start with a zero )' : ''
}
const checkSale = (value) => {
  const re = /^100$|^[123456789][0-9]$|^[0-9]$/
  return !re.test(value) ? 'Please enter a valid sale ( 0 - 100 )' : ''
}
const checkPassword = (value) => {
  // const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  const re = /^[0-9a-zA-Z]{8,}$/
  return !re.test(value) ? 'Please enter a valid password' : ''
}

export { checkRequired, checkOnlyString, checkSale, checkOnlyNumber, checkNumberNot0, isEmail, checkPassword }
