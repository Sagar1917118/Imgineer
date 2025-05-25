import { useEffect, useState } from "react";
import { FolderIcon,  SettingsIcon, ImageIcon,ClipboardCopyIcon} from 'lucide-react';
import AssetRow from "./AssetRow";
import UploadButton from "../Buttons/UploadButton";
import AssetUploader from "./AssetUploader";
import CreateFolder from "./CreateFolder";
import axios from "axios";
import { useApp } from "../context/AppContext";

const TableHeader = () => {
  return (
    <div className="grid grid-cols-8 gap-4 py-3 px-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
      <div className="col-span-1">Thumbnail</div>
      <div className="col-span-1">Display name</div>
      <div className="col-span-1">Containing folder</div>
      <div className="col-span-1">Asset type</div>
      <div className="col-span-1">Format</div>
      <div className="col-span-1">Size (in KB)</div>
      <div className="col-span-2 flex flex-col">
        <div className="text-blue-600">Public Url</div>
        <div className="text-green-600">Transformation Url</div>
      </div>
    </div>
  );
};

const FolderFilter = ({ folders, activeFolder, setActiveFolder }) => {
  const [showCopied, setShowCopied] = useState(false);
  const handleCopy = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };
  return (
    <div className="relative mb-4 flex overflow-x-auto py-2 px-4 space-x-2">
      {folders.map(folder => (
        <button
          key={folder.id}
          onClick={() => setActiveFolder(folder.name)}
          className={`px-3 py-1.5 rounded-md flex group items-center ${
            activeFolder === folder.name 
              ? 'bg-blue-100 text-blue-700 border border-blue-300' 
              : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          {folder.name === 'All Assets' ? (
            <ImageIcon size={14} className="mr-1.5" />
          ) : (
            <FolderIcon size={14} className="mr-1.5" />
          )}
          <span className="text-sm">{folder.name}</span>
          <button
          onClick={(e) => handleCopy(e,folder.id)}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-400"
          title="Copy public URL"
        >
          <ClipboardCopyIcon size={14} />
        </button>
        </button>
      ))}
       {showCopied && (
          <div className="z-10 absolute top-4 left-4 transform translate-x-full -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded">
            Id Copied!
          </div>
        )}
    </div>
  );
};

export default  function MediaView(){
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [activeFolder, setActiveFolder] = useState('All Assets');
  // const [mockAssets,setMockAsset]=useState([]);
  const data = localStorage.getItem('user-info');
  const token = JSON.parse(data)?.token;
  const {folders,GetFolders,mockAssets}=useApp();
  const [filteredAssets,setFilteredAsset]=useState([]);

  useEffect(()=>{
      const y = activeFolder === 'All Assets' 
    ? mockAssets 
    : mockAssets.filter(asset => asset.folderName == activeFolder);
    setFilteredAsset(y);
  },[activeFolder,mockAssets])
  const toggleSelect = (id) => {
    setSelectedAssets(prev => 
      prev.includes(id)
        ? prev.filter(assetId => assetId !== id)
        : [...prev, id]
    );
  };
  
  const selectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(filteredAssets.map(asset => asset.id));
    }
  };
  const [uploadOverlay,setUploadOverlay]=useState(false);
  

  console.log(activeFolder)
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {uploadOverlay && (<AssetUploader folders={folders} setUploadOverlay={setUploadOverlay}></AssetUploader>)}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Media Assets</h2>
        
        <div className="flex items-center space-x-2">
          <UploadButton setUploadOverlay={setUploadOverlay}></UploadButton>
          
          
          <button className="p-2 rounded-md hover:bg-gray-100" title="Settings">
            <SettingsIcon size={18} />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <FolderFilter 
          folders={folders} 
          activeFolder={activeFolder} 
          setActiveFolder={setActiveFolder} 
        />
        <div className="py-2">
          <CreateFolder token={token} GetFolders={GetFolders}/>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="border-b border-gray-200 bg-white">
          <div className="px-4 py-2 flex items-center">
            <input 
              type="checkbox" 
              checked={selectedAssets.length === filteredAssets.length && filteredAssets.length > 0} 
              onChange={selectAll}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">
              {selectedAssets.length} selected
            </span>
          </div>
        </div>
        
        <TableHeader />
        
        {filteredAssets.map(asset => (
          <AssetRow 
            key={asset.id} 
            asset={asset} 
            isSelected={selectedAssets.includes(asset.id)}
            toggleSelect={toggleSelect}
          />
        ))}
      </div>
    </div>
  );
};