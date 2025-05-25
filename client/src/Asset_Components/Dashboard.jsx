import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MediaView from "./MediaView";
import ApiKeyView from "./ApiKeyView";
import { FolderOpenIcon } from 'lucide-react';
import ImgineerSDKDocs from "./ImgineerSDKDocs";
import ImageOperationDocumentation from "./ImageOperationDocumentation";
export default function Dashboard() {

  const [activeView, setActiveView] = useState('media');
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* For mobile: Sidebar toggle could be added here */}
      
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
      </div>
      
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 p-4 z-10">
        <button className="bg-white p-2 rounded-md shadow-md">
          <FolderOpenIcon size={20} />
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeView === 'media' && <MediaView />}
        {activeView === 'apikey' && <ApiKeyView />}
        {activeView === 'documention' && <ImgineerSDKDocs/>}
        {activeView === 'imgineer' && <ImageOperationDocumentation/>}
      </div>
    </div>
  );
}