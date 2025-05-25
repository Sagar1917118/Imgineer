import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronRight, Copy, Terminal, ExternalLink } from 'lucide-react';
import floderIdSS from "../icons/folderId.png";
import apiKeySS from "../icons/apiKeySS.png";
export default function ImgineerSDKDocs() {
  // Force the document to be scrollable
  const containerStyle = {
    maxHeight: '100vh',
    overflowY: 'auto'
  };
  const [openSections, setOpenSections] = useState({
    installation: true,
    gettingStarted: true,
    apiReference: false,
    examples: false,
    upcomingFeatures: false
  });
  
  const [copiedState, setCopiedState] = useState({});
  
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedState(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedState(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };
  
  const CodeBlock = ({ children, id }) => {
    return (
      <div className="relative bg-gray-900 rounded-md my-4">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-t-md border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Terminal size={16} className="text-gray-400" />
            <span className="text-sm text-gray-300 font-mono">code</span>
          </div>
          <button 
            onClick={() => copyToClipboard(children, id)}
            className="text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            {copiedState[id] ? (
              <CheckCircle size={18} className="text-green-400" />
            ) : (
              <Copy size={18} />
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono">
          {children}
        </pre>
      </div>
    );
  };
  
  const Section = ({ title, id, children }) => {
    return (
      <div className="border-b border-gray-200 py-4">
        <button 
          onClick={() => toggleSection(id)} 
          className="flex justify-between items-center w-full text-left font-medium text-gray-900"
        >
          <span className="text-xl">{title}</span>
          {openSections[id] ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </button>
        {openSections[id] && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-blue-100 font-sans " style={containerStyle}>
      <header className="bg-blue-500 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Imgineer SDK</h1>
          <p className="text-xl opacity-90">
            Simple and powerful asset upload SDK for your applications
          </p>
        </div>
      </header>
      
      <main className="w-3/4 mx-auto px-6 py-8">
        <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">🚀 Quick Start</h2>
          <p className="text-blue-700">
            Install the package and start using Imgineer in your project in minutes.
          </p>
           <CodeBlock id="npm">
            npm install imgineer_sdk
          </CodeBlock>
          
          <CodeBlock id="yarn">
            yarn add imgineer_sdk
          </CodeBlock>
          <CodeBlock id="quickstart">
{`npm install imgineer_sdk

// In your code
import { uploadAsset } from "imgineer_sdk";

// Upload an asset
const upload = async () => {
  const apiKey = "your_api_key";
  const folderId = "your_folder_id";
  const file = yourFileObject;
  
  try {
    const url = await uploadAsset(apiKey, folderId, file);
    console.log("Uploaded successfully:", url);
  } catch (error) {
    console.error("Upload failed:", error.message);
  }
}`}
          </CodeBlock>
        </div>
        
        
        <Section title="Getting Started" id="gettingStarted">
          <h3 className="text-lg font-medium mb-3">Prerequisites</h3>
          <p className="mb-4">
            Before using the Imgineer SDK, you'll need:
          </p>
          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li>An Imgineer account</li>
            <li>An API key</li>
            <li>A folder ID where you want to upload assets</li>
          </ul>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">How to get your API Key</h3>
            <p className="mb-4">
              You can obtain your API key from the Imgineer dashboard settings page.
            </p>
            <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
              <div className="flex items-center justify-center">
                <img src={apiKeySS} alt="Getting your API key" className="rounded-md shadow-md" />
              </div>
              <p className="text-gray-600 text-sm text-center mt-2">
                Navigate to Settings → API Keys to generate your API key
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Finding your Folder ID</h3>
            <p className="mb-4">
              You'll need a folder ID to specify where to upload your assets.
            </p>
            <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
              <div className="flex items-center justify-center">
                <img src={floderIdSS} alt="Finding your Folder ID" className="rounded-md shadow-md" />
              </div>
              <p className="text-gray-600 text-sm text-center mt-2">
                Open the desired folder and find the ID in the URL or folder details panel
              </p>
            </div>
          </div>
        </Section>
        
        <Section title="API Reference" id="apiReference">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">uploadAsset</h3>
            <p className="mb-4">
              Uploads a file to the specified folder using your API key.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="font-medium mb-2">Parameters</h4>
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-2 px-3">Name</th>
                    <th className="text-left py-2 px-3">Type</th>
                    <th className="text-left py-2 px-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 px-3 font-mono text-blue-600">apiKey</td>
                    <td className="py-2 px-3">string</td>
                    <td className="py-2 px-3">Your Imgineer API key</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 px-3 font-mono text-blue-600">folderId</td>
                    <td className="py-2 px-3">string</td>
                    <td className="py-2 px-3">Target folder ID for the upload</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 px-3 font-mono text-blue-600">file</td>
                    <td className="py-2 px-3">File</td>
                    <td className="py-2 px-3">The file object to upload</td>
                  </tr>
                </tbody>
              </table>
              
              <h4 className="font-medium mt-4 mb-2">Returns</h4>
              <p className="ml-2 text-sm">
                <code className="bg-gray-100 px-1 py-0.5 rounded">Promise&lt;string&gt;</code> - 
                A promise that resolves to the URL of the uploaded asset
              </p>
              
              <h4 className="font-medium mt-4 mb-2">Throws</h4>
              <p className="ml-2 text-sm">
                <code className="bg-gray-100 px-1 py-0.5 rounded">Error</code> - 
                If the upload fails for any reason
              </p>
            </div>
          </div>
        </Section>
        
        <Section title="Integration Examples" id="examples">
          <h3 className="text-lg font-medium mb-3">React Example</h3>
          <p className="mb-4">
            Here's how to integrate the Imgineer SDK in a React application:
          </p>
          
          <CodeBlock id="react-example">
{`import React, { useState } from 'react';
import { uploadAsset } from 'imgineer_sdk';

const ImageUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    setError('');
    
    try {
      const apiKey = process.env.REACT_APP_IMGINEER_API_KEY;
      const folderId = 'your_folder_id'; 
      
      const url = await uploadAsset(apiKey, folderId, file);
      setUploadedUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={isUploading} 
      />
      
      {isUploading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {uploadedUrl && (
        <div>
          <p>Upload successful!</p>
          <img 
            src={uploadedUrl} 
            alt="Uploaded preview" 
            style={{ maxWidth: '300px' }} 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;`}
          </CodeBlock>
          
        </Section>
        
        <Section title="Upcoming Features" id="upcomingFeatures">
          <p className="mb-4">
            The Imgineer SDK is constantly evolving. Here are some features we're working on:
          </p>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <div>
                <span className="font-medium">Batch Uploads</span>
                <p className="text-gray-600 text-sm">Upload multiple files at once with progress tracking</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <div>
                <span className="font-medium">Asset Transformation</span>
                <p className="text-gray-600 text-sm">Resize, crop, and optimize images during upload</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <div>
                <span className="font-medium">Asset Management</span>
                <p className="text-gray-600 text-sm">List, search, and manage your assets programmatically</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <div>
                <span className="font-medium">Webhook Notifications</span>
                <p className="text-gray-600 text-sm">Get notified when uploads complete or when assets are modified</p>
              </div>
            </li>
          </ul>
        </Section>
        
        <div className="bg-blue-400 text-white p-6 rounded-lg mt-8">
          <h2 className="text-xl font-bold mb-3">Need Help?</h2>
          <p className="mb-4">
            If you have any questions or need assistance, don't hesitate to reach out to our support team.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              <span>Documentation</span>
              <ExternalLink size={16} className="ml-2" />
            </a>
            <a href="#" className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              <span>GitHub</span>
              <ExternalLink size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}