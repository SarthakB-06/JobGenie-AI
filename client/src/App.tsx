import React, { type JSX } from 'react'
import { BrowserRouter as Router , Routes , Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.js'
import { AuthProvider, useAuth } from './context/AuthContext.js'
import UploadZone from './components/resume/UploadZone.js'
import Dashboard from './pages/Dashboard.js'
import LandingPage from './pages/LandingPage.js'
import { History } from './pages/History.js'; 

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className='min-h-screen bg-gray-50 text-gray-900'>
        <Routes>
           <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/upload" element={<UploadZone onAnalysisComplete={(data) => console.log(data)} />} />
             <Route path="/history" element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } />
        </Routes>

      </div>
    </Router>
    </AuthProvider>
  )
}

export default App
