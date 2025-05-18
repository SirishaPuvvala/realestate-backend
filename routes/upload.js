// realestate-backend/index.js or app.js

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

//t app = express();
//nst PORT = 5000;
const router = express.Router();


// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ This is your /api/upload route
router.post('/', upload.single('file'), (req, res) => {
  console.log('Upload route hit', req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'Upload successful',
    filePath: `/uploads/${req.file.filename}`,
  });
});
module.exports = router;
