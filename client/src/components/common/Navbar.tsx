import { useAuth } from '../../context/AuthContext.js';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, History as HistoryIcon, Sparkles } from 'lucide-react';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                <Link to="/dashboard" className="flex items-center gap-2 group">
                   <div className="bg-linear-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg text-white group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                       <Sparkles size={20} fill="currentColor" />
                   </div>
                   <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                     JobGenie.AI
                   </span>
                </Link>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200">
                        <Link 
                            to="/dashboard" 
                            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                                isActive('/dashboard') 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                            }`}
                        >
                            <LayoutDashboard size={16} />
                            Dashboard
                        </Link>

                        <Link 
                            to="/history" 
                            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                                isActive('/history') 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                            }`}
                        >
                            <HistoryIcon size={16} />
                            History
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-800 leading-none">{user?.name}</p>
                            <p className="text-xs text-slate-500 mt-1">Free Plan</p>
                        </div>
                        <button 
                            onClick={logout}
                            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                            title="Sign Out"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};