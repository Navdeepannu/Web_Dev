// let vs var

for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(`Var : ${i}`)
  }, 1000)
}

setTimeout(() => {
  console.log(`---------------`)
}, 1000)

for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(`let : ${i}`)
  }, 1000)
}
