// 1. Create new Express application server
// 2. Create routes file and import into server
// 3. Create route /name that renders your name
// 4. Create route /greeting that renders your name and student number
// 5. Create route /add that accepts x and y as get params and returns result
// 6. Create route /calculate that accept a, b, and operation to perform (+, -, *, /, **)
// 7. Use Postman to handle your incoming requests and provide screenshots for each step

require("dotenv").config()
const express = require("express")
const routes = require("./route") // routes file
const app = express()

// Use imported routes
app.use("/", routes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
