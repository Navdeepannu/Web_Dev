import express from "express"
import upload from "../middleware/multer.js"

const router = express.Router()

router.post("/single", upload.single("file"), (req, res) => {
  console.log("Uploaded File:", req.file)

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" })
  }

  res.json({
    message: "Image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  })
})

// handle multiple files
router.post("/multiple", upload.array("files", 3), (req, res) => {
  console.log("Upload Files:", req.files)

  // if no file is uploaded or length of array 0
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No file uploaded" })
  }

  // else upload
  res.json({
    message: "Image uploaded successfully",
    filePaths: req.files.map((file) => `/uploads/${file.filename}`),
  })
})

// save dog images from api
router.post("/dog", upload.single("file"), (req, res) => {
  console.log("Uploaded Dog Image: ", req.file)

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" })
  }

  res.json({
    message: "Dog image uploaded successfully",
    imagePath: `/uploads/${req.file.filename}`,
  })
})
export default router
