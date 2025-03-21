import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./s3.ts";

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(null, `${file.fieldname}/${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    // pdf 확장자만 업로드
    if (file.fieldname === "portfolio" && file.mimetype !== "application/pdf") {
      return cb(null, false);
    }

    cb(null, true);
  },
});

export default upload;
