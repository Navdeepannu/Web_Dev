import "dotenv/config"
import http from "http"
import fs from "fs"
import path from "path"

const app = http.createServer((req, res) => {
  if (req.url === "/") {
    const homePage = fs.readFileSync(path.join("html", "home.html"))
    res.end(homePage)
  } else if (req.url === "/about") {
    const aboutPage = fs.readFileSync(path.join("html", "about.html"))
    res.end(aboutPage)
  } else if (req.url === "/contact") {
    const contactPage = fs.readFileSync(path.join("html", "contact.html"))
    res.end(contactPage)
  } else {
    const pageNotFound = fs.readFileSync(path.join("html", "badRequest.html"))
    res.end(pageNotFound)
  }
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
