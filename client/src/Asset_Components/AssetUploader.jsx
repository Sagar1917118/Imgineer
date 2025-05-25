import { useState ,useMemo} from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import UploadTimeline from './UploadTimeline';
import { uploadAsset } from "imgineer_sdk";
import { useApp } from '../context/AppContext';

// this is for testing for the sdk
// const uploadUsingSDK = async (file,folder) => {
//   const folderId = folder;
//   const apiKey = "273ffc5636119e297879a42755d3ab9080669c28e154af36bd534e704f4b9040";
//   const backendUrl="http://localhost:8080"

//   try {
//     console.log(file,folderId,apiKey,backendUrl);
//     const url = await uploadAsset(apiKey,folderId,file,backendUrl);
//     console.log("Uploaded File URL:", url);
//   } catch (err) {
//     alert("Upload failed: " + err.message);
//   }
// };

export default function AssetUploader({ folders ,setUploadOverlay}) {
  const data = localStorage.getItem('user-info');
  const token = JSON.parse(data)?.token;
   // these are states to demonstrate upload process
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // ----------------------------------------------
  const [selectedFolder, setSelectedFolder] = useState();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {fetchAssets}=useApp();
  const handleFileSelect = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file || !selectedFolder) {
      alert("Please select a folder and file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("folder", selectedFolder);
    // console.log(file)
    // console.log("File is going to upload using sdk")
    // uploadUsingSDK(file,selectedFolder);
    // console.log("File have been succlssfuly uploaded using sdk")
    // return;
    try {
      setCurrentStep(0);
      setIsUploading(true);
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/upload-url`,{
            filename: file.name,
            fileType: file.type,
            fileSize: file.size
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setIsUploading(false);
      console.log(response);

      // till here persigned url have been generated successfully
      
      // async function to upload file to s3
      console.log("Please wait uploading file to cloud");
      console.log("file",file,formData);
      setCurrentStep(1);
      setIsUploading(true);
      const responseS3 = await axios.put(response?.data?.uploadURL, file, {
          headers: {
            'Content-Type': file.type,
          }
        });
      console.log(responseS3);
      console.log("File have been successfuly uploaded to cloud");

      // notify backend
      const obj=
      {
        name:file.name,
        key:response?.data?.key,
        publicUrl:response?.data?.publicUrl,
        size:file.size,
        folderId:selectedFolder,
        assetInfo:file.type,
      }
      console.log(obj);
      setIsUploading(false);
      setCurrentStep(2);
      setIsUploading(true);
      const backendResponse=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/notify_upload`,obj,{
          headers: {
            Authorization: `Bearer ${token}`
          }
       })
      setIsUploading(false);
      setCurrentStep(3);
      console.log("This is backend response",backendResponse);
      alert("Asset uploaded successfully!");
      fetchAssets();
      setFile(null);
    } catch (err) {
      setError(true);
      console.log("Error in uploading file",err.message);
      alert("Upload failed. Please try again.");
    } finally {
      setTimeout(()=>{
         setUploading(false);
      },1000);
    }
  };
  const filteredFolders = useMemo(() => folders.filter((f) => f.id), [folders]);

  return (
    <div className="z-50 backdrop-blur-lg w-11/12 md:w-1/2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-blue-300 p-6 rounded-md bg-blue-50">
      {/* Folder Selection */}
      <X  onClick={()=>{setUploadOverlay(false)}} size={40} className="absolute top-1 right-2 text-red-300 cursor-pointer hover:text-red-500" />
     

       {
        uploading ? (
            <UploadTimeline currentStep={currentStep} error={error} isUploading={isUploading}></UploadTimeline>
        )
        :(
              //this is uploading component
              <div>
                    <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Folder</label>
              <select
                className="w-full border border-blue-200 rounded px-3 py-2 text-sm"
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
              >
                <option value="">-- Select a folder --</option>

                {filteredFolders.map((folder) => (
                  <option className="bg-gray-200" key={folder?.id}  value={folder?.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={`mt-2 flex flex-col items-center justify-center h-60 border-2 border-dashed border-blue-300 rounded-md cursor-pointer transition ${
                dragActive ? "bg-blue-50 border-blue-500" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 014-4h10a4 4 0 014 4v5H3v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 10l-4-4m0 0l-4 4m4-4v12" />
              </svg>

              <p className="text-gray-500 text-sm">Drag and Drop assets here</p>
              <p className="text-gray-400 text-sm my-1">Or</p>

              <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 text-sm">
                Browse
                <input type="file" onChange={handleFileSelect} hidden />
              </label>
            </div>

            {file && (
              <div className="mt-4 text-sm text-gray-700">
                Selected file: <span className="font-medium">{file.name}</span>
              </div>
            )}

            </div>
              // ------------------------- 
        )
       }
        <div className="mt-6 flex justify-end">
              <button
                disabled={!file || !selectedFolder || uploading}
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm"
              >
                {uploading ? "Uploading..." : "Upload Asset"}
              </button>
            </div>
     
    </div>
  );
}
