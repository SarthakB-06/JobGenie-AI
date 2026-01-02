import mongoose from 'mongoose'
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
    atsScore: {
        type: Number,
        default: 0,
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