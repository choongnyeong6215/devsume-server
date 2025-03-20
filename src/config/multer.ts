import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./s3.ts";

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `profile/${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;
