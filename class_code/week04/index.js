import express from "express"
import logger from "./Middleware/logger.js"
import auth from "./Middleware/auth.js"

const app = express()

const PORT = process.env.PORT || 8000

// middlelware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(logger)

// routes
app.get("/", logger, (req, res) => {
  res.send("Welcome to our server")
})

app.get("/about", (req, res) => {
  res.send("Welcome to about page")
})

app.get("/login", (req, res) => {
  res.send("Recieved request - Login")
})

app.post("/login", (req, res) => {
  res.send("We stole your info")
})

// Check for auth
app.get("/fetchData", auth, (req, res) => {
  res.send(`Hi Navdeep`)
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

app.use("", (req, res) => {
  res.status(404).send("Page not found")
})
