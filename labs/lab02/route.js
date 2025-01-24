const express = require("express")
const router = express.Router()

module.exports = router

router.get("/name", (req, res) => {
  res.send("Navdeep Singh")
})

router.get("/greeting", (req, res) => {
  res.send("Navdeep Singh - N01614545")
})

// Add route
router.get("/add", (req, res) => {
  const { x, y } = req.query

  if (!x || !y) {
    return res.send("Missing required parameters!")
  }

  const sum = parseFloat(x) + parseFloat(y)

  res.send(`The result is ${sum}`)
})

// Calculate route
router.get("/calculate", (req, res) => {
  const { a, b, operator } = req.query

  // decoding the operator in case "+" is sent as a space (" ") in the URL
  let decodedOperator = operator

  // If operator is space replace with "+"
  if (operator === " ") {
    decodedOperator = "+"
  } else {
    decodedOperator = operator
  }

  // Check for parameters
  if (!a || !b || !decodedOperator) {
    return res.send("Missing required parameters: a, b and operator!")
  }

  const numA = parseFloat(a)
  const numB = parseFloat(b)

  // Check for right value
  if (isNaN(numA) || isNaN(numB)) {
    return res.send("Query parameters a and b must be a valid number!")
  }

  // declare result
  let result

  // Using switch case to check for operator
  switch (decodedOperator) {
    case "+":
      result = numA + numB
      break
    case "-":
      result = numA - numB
      break
    case "*":
      result = numA * numB
      break
    case "/":
      // if dividing by zero
      if (numB === 0) {
        return res.send("Division by zero is not allowed.")
      }
      result = numA / numB
      break
    case "**":
      result = numA ** numB
      break
    default:
      res.send("Invalid operator")
      return
  }

  res.send(`The result of ${a} ${decodedOperator} ${b} is : ${result}`)
})
