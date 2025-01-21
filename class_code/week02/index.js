//const http = require(http);
import http from "http"
import fs from "fs"

const app = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end(`${fs.readFileSync("./homePage.html")}`)
  } else if (req.url === "/about") {
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      line-height: 1.6;
    }

    header {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1.5rem 0;
    }

    header h1 {
      margin: 0;
    }

    main {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
      background: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }

    main h2 {
      color: #333;
      margin-bottom: 1rem;
    }

    main p {
      color: #555;
      margin-bottom: 1rem;
    }

    footer {
      text-align: center;
      background-color: #333;
      color: white;
      padding: 1rem 0;
      position: fixed;
      bottom: 0;
      width: 100%;
    }

    a {
      color: #007BFF;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <header>
    <h1>About Us</h1>
  </header>

  <main>
    <h2>Who We Are</h2>
    <p>
      Welcome to our website! We are a passionate team dedicated to providing the best services and products for our customers. 
      Our mission is to create a positive impact and deliver exceptional value.
    </p>

    <h2>Our Values</h2>
    <p>
      We believe in integrity, innovation, and excellence. Our goal is to continuously improve and exceed expectations while maintaining a strong focus on quality and customer satisfaction.
    </p>

    <h2>Contact Us</h2>
    <p>
      Have questions or feedback? Feel free to <a href="contact.html">contact us</a>. We’d love to hear from you!
    </p>
  </main>

  <footer>
    <p>&copy; 2025 Your Company. All rights reserved.</p>
  </footer>
</body>
</html>
`)
  } else {
    res.end("404 Page not found")
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
