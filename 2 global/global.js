console.log(global)

global.setTimeout(() => {
  console.log("3 seconds have passed")
  clearInterval(int)
}, 3000)

const int = setInterval(() => {
  console.log("1 second has passed")
}, 1000)

console.log(__dirname) 
console.log(__filename) 
