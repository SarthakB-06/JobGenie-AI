import express ,{type RequestHandler} from 'express';
import { searchJobs } from '../controllers/jobController.js';
import  {protect}  from '../middlewares/authMiddleware.js';

const router = express.Router()
router.post('/search', protect as RequestHandler, searchJobs as RequestHandler);


export default router