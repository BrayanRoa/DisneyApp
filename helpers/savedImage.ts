import multer from "multer"

// const extensionesValidas = ['png', 'jpeg', 'jpg', 'gif']


const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    const folder = req.params.coleccion
    cb(null, `uploads/${folder}`)
  },
  filename: function (req, file, cb) {
    // const extension = file.mimetype.split('/');
    // if (!) {
    //   throw new Error(`La extension ${extension} no es valida`)
    // }
    cb(null, `${file.originalname}`)
  }
})

export const upload = multer({ storage: storage })