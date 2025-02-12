import "./App.css"
import { useState } from "react"
function App() {
  const [singleFile, setSingleFile] = useState(null)
  const [multipleFiles, setMultipleFiles] = useState([])
  const [displayImage, setDisplayImage] = useState(null)
  const [message, setMessage] = useState("")
  const [randomImages, setRandomImages] = useState([])
  const [dogImage, setDogImage] = useState("")

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0])
    }
  }

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`)

      const blob = await response.blob() // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob)
      setDisplayImage(imageUrl)
    } catch (error) {
      console.error("Error fetching single file:", error)
    }
  }

  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault()
    if (!singleFile) {
      setMessage("Please select a file before uploading.")
      return
    }

    try {
      const formData = new FormData()
      formData.append("file", singleFile)

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed")
      }
      setMessage("File uploaded successfully!")
    } catch (error) {
      console.log("Error:", error)
    }
  }

  // fetch functions -> save multiple [TODO]
  const handleMultipleFilesChange = async (e) => {
    if (e.target.files.length > 3) {
      alert("You can only upload up to 3 files.")
      return
    }
    setMultipleFiles([...e.target.files])
  }

  // fetch functions -> fetch multiple [TODO]
  const handleUploadMultipleFiles = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    multipleFiles.forEach((file) => {
      formData.append("files", file)
    })

    try {
      const response = await fetch(`http://localhost:8000/save/multiple`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Image upload failed")
      }
      setMessage("Multiple files uploaded successfully.")
    } catch (error) {
      console.log(`Error Uploading multiple files: ${error}`)
    }
  }

  // Fetch multiple random images
  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`)

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch images")
      }

      // construct image URL
      console.log(data)
      setRandomImages(data.images)
    } catch (error) {
      console.error("Error fetching multiple files:", error)
    }
  }

  // fetch dog images from API
  const fetchDogImages = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.status || " failed to fetch data")
      }

      setDogImage(data.message)
      setMessage("Dog Image fetched successfully.")
    } catch (error) {
      console.log(`Failed to fetch dod images : ${error}`)
    }
  }

  // fetch functions -> save dog image [TODO]
  const uploadDogImage = async (e) => {
    e.preventDefault()

    if (!dogImage) {
      setMessage("Click on fetch dog image first!")
      return
    }

    try {
      // Fetching image as a blob (image file)
      const response = await fetch(dogImage)
      const blob = await response.blob()

      const formData = new FormData()
      formData.append("file", blob, "dog-image.jpg")

      const uploadResponse = await fetch(`http://localhost:8000/save/dog`, {
        method: "POST",
        body: formData,
      })

      const data = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(data.message || "Failed to save image")
      }

      setMessage("Dog image uploaded successfully!")
    } catch (error) {
      console.log(`Error uploading dog image: ${error}`)
    }
  }

  return (
    <div>
      <p style={{ color: "green" }}>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}

      <h2>Fetch Multiple Random Images</h2>
      <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {randomImages.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:8000/${img}`}
            alt={`Random ${index}`}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        ))}
      </div>

      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>

      {/* Select multiple files */}
      <form onSubmit={handleUploadMultipleFiles}>
        <h2>Upload Multiple Files</h2>
        <input type="file" multiple onChange={handleMultipleFilesChange} />
        <button>Upload Multiple Files</button>
      </form>

      {/* fetch dog image api data */}
      <form onSubmit={fetchDogImages} style={{ marginTop: "40px" }}>
        {dogImage && (
          <img
            src={dogImage}
            alt={`Random Image `}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
            }}
          />
        )}
        <button type="submit">Fetch Dog Images</button>
      </form>

      {/* Upload Dog Image */}
      <form onSubmit={uploadDogImage} style={{ marginTop: "20px" }}>
        <button type="submit">Upload the Dog Image</button>
        <p style={{ color: "green" }}>{message}</p>
      </form>
    </div>
  )
}

export default App
