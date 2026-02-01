import { useAuth } from '../../context/AuthContext.js';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, History as HistoryIcon } from 'lucide-react'; // Import Icon

export const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    // Helper to check active link
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                     JobGenie.AI
                   </span>
                </div>

                <div className="flex items-center gap-6">
                    {/* Navigation Links */}
                    <Link 
                        to="/dashboard" 
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                            isActive('/dashboard') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <Link 
                        to="/history" 
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                            isActive('/history') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        <HistoryIcon size={18} />
                        History
                    </Link>

                    {/* User Profile */}
                    <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
                        <span className="text-sm font-semibold text-gray-700">
                            {user?.name || 'User'}
                        </span>
                        <button 
                            onClick={logout}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                            title="Sign Out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};