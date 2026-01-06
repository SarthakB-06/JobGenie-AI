import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from './pages/Login.js'
import { AuthProvider } from './context/AuthContext.js'
import UploadZone from './components/resume/UploadZone.js'
import Dashboard from './pages/Dashboard.js'
import LandingPage from './pages/LandingPage.js'

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className='min-h-screen bg-gray-50 text-gray-900'>
        <Routes>
           <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadZone onAnalysisComplete={(data) => console.log(data)} />} />
        </Routes>

      </div>
    </Router>
    </AuthProvider>
  )
}

export default App
