import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resumeRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=> {
    res.send('JobGenie AI API is running')
})

app.use('/api/auth' , authRoutes)
app.use('/api/resumes' , resumeRoutes)
app.use('/api/jobs' ,jobRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})