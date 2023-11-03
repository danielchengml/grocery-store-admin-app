// const express = require("express");
// const routes = require("./routes");
// const app = express();
// const port = process.env.PORT || 4000;

// app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// routes(app);
// app.listen(port, () => console.log(`Server running on port ${port}`));

import '@babel/polyfill';
import express from 'express';
import multer from 'multer';
import routes from './routes';

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Unique file name with a timestamp
  },
});
const upload = multer({ storage });
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // You can save the file details in a database, return a response, etc.
  const uploadedFile = {
    filename: req.file.filename,
    path: req.file.path,
  };

  res.status(200).json(uploadedFile);
});
app.use(express.static('public'));
const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

routes(app);
app.listen(port, () => console.log(`Server running on port ${port}`));