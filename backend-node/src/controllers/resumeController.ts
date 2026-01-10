import type {Response} from 'express';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

import type { AuthRequest } from '../middlewares/authMiddleware.js';
import Resume from '../models/Resume.js';

export const uploadResume = async (req:AuthRequest , res:Response): Promise<void> => {
    try{
        if(!req.file){
            res.status(400).json({message: 'No file uploaded'});
            return;
        }
        const formData = new FormData();
        formData.append('file' , fs.createReadStream(req.file.path))

        const jd = req.body.jobDescription || req.body.job_description || "General Software Engineer";
        formData.append('job_description', jd); 

        let analysisData = { ats_score: 0, feedback: [], extracted_text_length: 0 };

        try{
            const pythonRes = await axios.post('http://127.0.0.1:8000/analyze' , formData, {
                headers:{
                    ...formData.getHeaders()
                }
            })

            analysisData = pythonRes.data
            console.log('Analysis Data:', analysisData);
        }catch(aiError){
            console.error('Python AI service error:', (aiError as Error).message);
        }

        const resume = await Resume.create({
            user: req.user._id,
            fileName : req.file.originalname,
            fileUrl : req.file.path,
            atsScore: analysisData.ats_score,
            analysisResults:analysisData,
            isParsed:true
        })
        res.status(201).json(resume);
    }catch(error){
        res.status(500).json({message: (error as Error).message});
    }
}