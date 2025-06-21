import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const route = path.join(import.meta.dirname, '..', 'public', 'productimg')
    cb(null, route)
  },
  filename: function(req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}}`
    cb(null, filename)
  }
})

const upload = multer({storage})

export default upload