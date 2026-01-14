import mongoose from 'mongoose'

export interface IResume extends mongoose.Document {
    user: mongoose.Types.ObjectId;
  fileName: string;
  fileUrl: string; 
  uploadDate: Date;
  
  // Analysis Data
  targetJobContext: string; 
  atsScore: number;
  extractedSkills: string[];
  missingSkills: string[];
  aiFeedback: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    suggestion: string;
  };
}

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileName: { // 
        type: String,
        required: true,
    },
    fileUrl: {
        type: String, // Path to file (local or S3)
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    targetJobContext: {
        type: String,
        default: '',
    },
    atsScore: {
        type: Number,
        default: 0,
    },
    extractedSkills: {
        type: [String],
        default: [],
    },
    missingSkills: {
        type: [String],
        default: [],
    },
    aiFeedback: {
    summary: String,
    strengths: [String],
    weaknesses: [String],
    suggestion: String
    },
    analysisResults: {
        type: Object, // Stores the JSON feedback from Python AI
        default: {},
    },
    isParsed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})

const Resume = mongoose.model('Resume', resumeSchema)

export default Resume