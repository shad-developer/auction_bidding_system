const multer = require("multer");
const path = require("path");

function sanitizeFileName(fileName) {
  return fileName
    .replace(/\s+/g, "-") 
    .replace(/[^a-zA-Z0-9.\-]/g, "") 
    .toLowerCase(); 
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + sanitizeFileName(file.originalname);
    cb(null, uniqueName); 
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true); 
  } else {
    cb(null, false); 
  }
}

const upload = multer({
  storage: storage,
  // Uncomment the below line if you want to limit file size to 5MB
  // limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

module.exports = upload;
