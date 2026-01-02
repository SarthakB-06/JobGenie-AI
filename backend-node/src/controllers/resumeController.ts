import type {Response} from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
import Resume from '../models/Resume.js';

export const uploadResume = async (req:AuthRequest , res:Response): Promise<void> => {
    try{
        if(!req.file){
            res.status(400).json({message: 'No file uploaded'});
            return;
        }

        const resume = await Resume.create({
            user: req.user._id,
            fileName : req.file.originalname,
            fileUrl : req.file.path
        })
        res.status(201).json(resume);
    }catch(error){
        res.status(500).json({message: (error as Error).message});
    }
}