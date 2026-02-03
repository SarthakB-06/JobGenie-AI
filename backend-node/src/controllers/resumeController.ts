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

        let analysisData:any  = { ats_score: 0, feedback: [], extracted_text_length: 0 };
        const pythonUrl = process.env.PYTHON_SERVICE_URL
        try{
            const pythonRes = await axios.post(`${pythonUrl}/analyze` , formData, {
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
            targetJobContext: jd,
            extractedSkills: analysisData.key_skills || [],
            missingSkills: analysisData.missing_skills || [],
            aiFeedback: {
                summary: analysisData.summary || "Analysis pending...",
                strengths: [], 
                weaknesses: analysisData.feedback || [],
                suggestion: (analysisData.feedback && analysisData.feedback.length > 0) 
                            ? analysisData.feedback[analysisData.feedback.length - 1] 
                            : ""
            },
            isParsed:true
        })
        res.status(201).json({
            _id: resume._id,
            
            
            ats_score: resume.atsScore,
            
            key_skills: resume.extractedSkills,     
            missing_skills: resume.missingSkills,
            
            summary: resume.aiFeedback?.summary,
            feedback: resume.aiFeedback?.weaknesses,
            
            market_benchmark_summary: analysisData.market_benchmark_summary 
    })
    }catch(error){
        res.status(500).json({message: (error as Error).message});
    }
}


export const getResumeHistory = async (req:AuthRequest, res:Response) : Promise<void> =>{
    try{
        const history = await Resume.find({user: req.user._id})
        .sort({uploadDate: -1})
        .limit(10)
        res.json(history);
    }catch(error){
        res.status(500).json({message:'Error fetching history'})
    }
}