import type {Request, Response} from 'express'
import axios from 'axios'

// @route POST /api/jobs/search


export const searchJobs = async(req:Request , res:Response): Promise<void> => {
    const {jobTitle,location,jobType} = req.body;

    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
            query: `${jobTitle} in ${location}`,
            page:'1',
            num_pages:'1',
            date_posted:'month',
            employment_type:jobType.toUpperCase().replace('-','')
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    }

    try{
        /*
    const dummyJobs = [
        { job_id: '1', job_title: 'React Developer', employer_name: 'Tech Corp', job_description: 'We need React, Node, AWS...' },
        { job_id: '2', job_title: 'Frontend Engineer', employer_name: 'Startup Inc', job_description: 'Looking for TypeScript, Tailwind, Redux...' }
    ];
    res.json(dummyJobs);
    return;
    */

    const response = await axios.request(options)
    res.json(response.data.data)
    }catch(error){
        console.error(error)
        res.status(500).json({message:'Server Error while fetching jobs'})
    }
}
