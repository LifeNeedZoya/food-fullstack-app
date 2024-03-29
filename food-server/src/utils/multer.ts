// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("d", path.join(__dirname, "../uploads"));

//     cb(null, path.join(__dirname, "../uploads/"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({ storage });

import multer from "multer";
import os from "os";
import path from "path";

// Define the custom temporary directory
const tmpDir = os.tmpdir(); // Get the system's temporary directory
const customTmpDir = path.join(tmpDir, "custom_tmp_folder");

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, customTmpDir); // Set the custom temporary directory as the destination
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

// Initialize multer with the custom storage engine
export const upload = multer({ storage: storage });
