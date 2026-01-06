import { useEffect, useState } from "react";
import {Upload , Loader2, FileText} from "lucide-react";
import API from "../../services/api.js";

interface UploadZoneProps{
    onAnalysisComplete : (data:any) => void;
    initialJobDescription?:string;
}

const UploadZone = ({onAnalysisComplete, initialJobDescription=''} : UploadZoneProps) => {
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState('');
    const [jobDescription , setJobDescription] = useState(initialJobDescription);

    useEffect(()=>{
      if(initialJobDescription){
        setJobDescription(initialJobDescription);
      }
    },[initialJobDescription]);

    const handleFileUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file){
            return;
        }
        if(!jobDescription.trim()){
          setError('Please provide a job description before uploading your resume.');
          return;
        }
        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('resume' , file);
        formData.append('jobDescription' , jobDescription);
        try{
            const {data} = await API.post('/resumes/upload' , formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            });
            onAnalysisComplete(data);
        } catch (err:any) {
             setError(err.response?.data?.message || 'Upload failed')
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Job Context (Editable)
        </label>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="We will auto-fill this based on market analysis..."
        />
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-gray-50 transition-colors relative bg-white">
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Analyzing against Market Standards...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Upload your Resume</h3>
            <p className="text-gray-500 mb-6">Supported formats: PDF, DOCX</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Select File & Analyze
            </button>
          </>
        )}
      </div>
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
};


export default UploadZone;