const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

require("dotenv/config");
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sereton-inn";

let storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: `${Date.now()}-seretoninn-${file.originalname}`,
        bucketName: "imageUpload",
      };
      resolve(fileInfo);
    });
  },
});

module.exports = multer({ storage });
