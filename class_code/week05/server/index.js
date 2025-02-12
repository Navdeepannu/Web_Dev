import express from "express"
import cors from "cors"
import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniquePrefix + file.fieldname + "-")
  },
})

const upload = multer({ storage: storage })

const app = express()
const PORT = process.env.PORT || 8000

// middelware
app.use(express.urlencoded({ extended: true })) // for HTML forms
app.use(express.json()) // extends application/json data, OLD method was bodyparser
app.use(cors())

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server")
})

app.get("/data", (req, res) => {
  const data = {
    fname: "Navdeep",
    lname: "Singh",
  }
  res.send(data)
})

app.post("/login", (req, res) => {
  console.log(req.body)
})

// Using multer storage
app.post("/fileform", upload.single("file"), (req, res) => {
  console.log(req.file)
  console.log(req.body)
  res.json("Information recieved.")
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

app.use("", (req, res) => {
  res.status(404).send("Page not found")
})
