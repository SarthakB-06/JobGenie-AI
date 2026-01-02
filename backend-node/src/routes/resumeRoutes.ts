import express, { type RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import { uploadResume } from '../controllers/resumeController.js';
import  { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Files will be saved in 'uploads' folder
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('PDF/DOC only!')); // Note: Error message should be "PDF/DOC only"
    }
  }
});

// Routes
router.post(
  '/upload', 
  protect as RequestHandler, 
  upload.single('resume'), 
  uploadResume as RequestHandler
);

export default router;