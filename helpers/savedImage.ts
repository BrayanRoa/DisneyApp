import multer from "multer"

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const folder = req.params.coleccion
    cb(null, `uploads/${folder}`)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})

export const upload = multer({ storage: storage })