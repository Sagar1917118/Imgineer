import { useState } from "react";
import { FileText, ImagePlay, KeyIcon, UserIcon, ImageIcon, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from "../context/AppContext";
const Profile = () => {
  const data = localStorage.getItem('user-info');
  const user = JSON.parse(data);
  return (
    <div className="flex items-center p-4 border-t border-gray-200">
      {
        user?.image ? (<img src={user.image} alt="User" style={{ width: "32px", height: "32px", borderRadius: "50%" }}/>):(
        <UserIcon size={16} />)
      }
      <div className="ml-2">
        <p className="text-sm font-medium">{user?.name}</p>
        <p className="text-[10px] font-medium text-blue-500">{user?.email}</p>
      </div>
    </div>
  );
};

export default function Sidebar({ activeView, setActiveView }){
   const {setIsAuthenticated}=useApp();
  const navigate = useNavigate();
  const handleLogout = ()=>{
        localStorage.removeItem('user-info');
        setIsAuthenticated(false);
        navigate('/');
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Asset Dashboard</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <button 
            onClick={() => setActiveView('media')}
            className={`flex items-center w-full p-2 rounded-md ${activeView === 'media' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          >
            <ImageIcon size={18} className="mr-2" />
            <span>View Media</span>
          </button>
          
          <button 
            onClick={() => setActiveView('apikey')}
            className={`flex items-center w-full p-2 rounded-md ${activeView === 'apikey' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          >
            <KeyIcon size={18} className="mr-2" />
            <span>API Keys</span>
          </button>
          
           <button 
            onClick={() => setActiveView('documention')}
            className={`flex items-center w-full p-2 rounded-md ${activeView === 'documention' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          >
            <FileText size={18} className="mr-2" />
            <span>SDKs Documentation</span>
          </button>

           <button 
            onClick={() => setActiveView('imgineer')}
            className={`flex items-center w-full p-2 rounded-md ${activeView === 'imgineer' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          >
            <ImagePlay size={18} className="mr-2" />
            <span>Imgineer Documentation</span>
          </button>
        </div>
      </div>
      
      <div className="mt-auto">
        <Profile />
        <button onClick={handleLogout} className="flex items-center w-full p-4 text-left hover:bg-gray-100 text-red-500">
          <LogOutIcon size={18} className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};