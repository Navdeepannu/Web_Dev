import { useState } from "react"
import "./App.css"

function App() {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [file, setFile] = useState(null)

  // Fetch function
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/data`)

      const data = await response.json()

      setMessage(JSON.stringify(data))
    } catch (error) {
      console.log(error)
    }
  }

  // login function
  const loginForm = async (e) => {
    e.preventDefault()

    const submission = { email, password }
    try {
      const response = await fetch(`http://localhost:8000/login`, {
        // type of POST
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      })

      const data = await response.json()
      setMessage(JSON.stringify(data))
    } catch (error) {
      console.log(error)
    }
  }

  // form for file upload
  const fileUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch(`http://localhost:8000/fileform`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      setMessage(JSON.stringify(data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>Message : {message}</h2>
      <button onClick={fetchData}>Click me for Data</button>

      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          required
        />

        <button type="submit" onClick={loginForm}>
          Login
        </button>
      </form>

      <form onSubmit={fileUpload}>
        <input type="file" onChange={(e) => setFile(e.target.value)} />
        <button type="submit">Upload File</button>
      </form>
    </>
  )
}

export default App
