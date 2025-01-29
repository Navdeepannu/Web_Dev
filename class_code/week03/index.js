import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

// CRUD : GET(READ), POST(CREATE, PUT(UPDATE), DELETE

app.get("/", (req, res) => {
  res.send("Welcome to the server - GET")
})
app.post("/", (req, res) => {
  res.send("Welcome to the server - POST")
})
app.put("/", (req, res) => {
  res.send("Welcome to the server - PUT")
})
app.delete("/", (req, res) => {
  res.send("Welcome to the server - DELETE")
})

// Search
app.get("/search", (req, res) => {
  console.log(req.url)
  console.log(req.headers)
  console.log(req.query)
  console.log(req.params)
  console.log(req.body)
  res.send("You came to the /search route")
})

app.get("/item/:itemID", (req, res) => {
  console.log(req.url)
  console.log(req.headers)
  console.log(req.query)
  console.log(req.params)
  console.log(req.body)
  res.send("You came to the /item route")
})

app.listen(port, () => {
  console.log(`Serving at ${port}`)
})
