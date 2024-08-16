import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = "./public/temp";
      fs.access(dir, (error) => {
        if (error) {
          // If directory does not exist, create it
          return fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
        } else {
          // If directory exists, use it
          return cb(null, dir);
        }
      })
        // cb(null, "../public/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  });
  
  export const upload = multer({ storage: storage });