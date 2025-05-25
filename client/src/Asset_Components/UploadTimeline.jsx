import { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';

export default function UploadTimeline({currentStep,error,isUploading}) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [error, setError] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

  
  const steps = [
    { id: 0, title: "Generating Presigned URL" },
    { id: 1, title: "Uploading Image to Cloud" },
    { id: 2, title: "Waiting for Backend Response" },
    { id: 3, title: "Asset Uploaded Successfully" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Asset Upload Process</h2>
      
      {/* Timeline component */}
      <div className="relative mb-10">
        {/* Horizontal line */}
        <div className="absolute h-1 w-full bg-gray-200 top-6"></div>
        
        {/* Steps container */}
        <div className="flex justify-between relative">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              {/* Step circle */}
              <div 
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                  error && currentStep === step.id 
                    ? 'bg-red-100 border-red-500 text-red-500' 
                    : step.id < currentStep
                      ? 'bg-green-100 border-green-500 text-green-500' 
                      : step.id === currentStep
                        ? 'bg-blue-100 border-blue-500 text-blue-500'
                        : 'bg-white border-gray-300 text-gray-300'
                }`}
              >
                {error && currentStep === step.id ? (
                  <X className="w-6 h-6" />
                ) : step.id < currentStep ? (
                  <Check className="w-6 h-6" />
                ) : step.id === currentStep && isUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <span className="text-sm font-semibold">{step.id + 1}</span>
                )}
              </div>
              
              {/* Step title */}
              <div className="mt-3 text-center">
                <p className={`text-sm font-medium ${
                  error && currentStep === step.id
                    ? 'text-red-600'
                    : step.id <= currentStep
                      ? 'text-gray-800'
                      : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Status message */}
      <div className="mb-6 text-center">
        {error ? (
          <div className="text-red-600 font-medium">
            Error uploading asset. Please try again.
          </div>
        ) : currentStep === steps.length - 1 ? (
          <div className="text-green-600 font-medium">
            Asset successfully uploaded!
          </div>
        ) : isUploading ? (
          <div className="text-blue-600 font-medium">
            {steps[currentStep].title}...
          </div>
        ) : (
          <div className="text-gray-600">
            Ready to upload your asset
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      {/* <div className="flex justify-center gap-4">
        <button
          onClick={startUpload}
          disabled={isUploading}
          className={`px-4 py-2 rounded-md font-medium ${
            isUploading 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Upload Another' : 'Upload Asset'}
        </button>
        
        <button
          onClick={simulateError}
          disabled={isUploading}
          className={`px-4 py-2 rounded-md font-medium ${
            isUploading 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          Simulate Error
        </button>
        
        {(error || currentStep === steps.length - 1) && (
          <button
            onClick={resetUpload}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium"
          >
            Reset
          </button>
        )}
      </div> */}
    </div>
  );
}