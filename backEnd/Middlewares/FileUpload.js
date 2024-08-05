const multer = require("multer");
const path = require("path");

const file_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const file_name = Date.now() + "-" + file.originalname;
    cb(null, file_name);
  },
});

const filterFileType = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp") {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("File Type Unsupported");
  }
};

const uploads = multer({ storage: file_storage, fileFilter: filterFileType });

module.exports = uploads;
