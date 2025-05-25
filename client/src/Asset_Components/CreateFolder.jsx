import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
export default function CreateFolder({token,GetFolders}) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [buttonState, setButtonState] = useState('visible'); // 'visible', 'sliding-out', 'hidden', 'sliding-in'
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [loading,setLoading]=useState(false);

  async function CreateFolders(){
    if (folderName.trim()) {
        console.log(`Created folder: ${folderName}`);
        setLoading(true);
        try{
            const response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_folders`,
                {
                    folderName
                },
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
        const obj = response?.data;

        const folders = [
        { name: "All Assets" },
        ...obj.map((e) => (e)),
        ];
        console.log(folders);
        GetFolders();
        }
        catch(err){
            console.log("Error in creating folders",err.message);
        }
        setFolderName('');
        hideInput();
        setLoading(false);
    }
  }
  const showInput = () => {
    // First slide out the button
    setButtonState('sliding-out');
    
    // After animation completes, show input and hide button completely
    setTimeout(() => {
      setButtonState('hidden');
      setIsInputVisible(true);
    }, 300);
  };

  const hideInput = () => {
    // Hide input first
    setIsInputVisible(false);
    
    // Start sliding in the button from the right
    setTimeout(() => {
      setButtonState('sliding-in');
      
      // After sliding in animation completes, set to normal visible state
      setTimeout(() => {
        setButtonState('visible');
      }, 300);
    }, 50);
  };


  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      hideInput();
    }
  };

  useEffect(() => {
    // Focus input when it becomes visible
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }

    // Add outside click listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInputVisible]);

  return (
    <div className="relative w-72 h-10 overflow-hidden">
      {/* Button with different animation states */}
      {buttonState !== 'hidden' && (
        <button
          className={`w-[130px] absolute inset-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center transition-all duration-300 ease-in-out ${
            buttonState === 'sliding-out' ? 'translate-x-full opacity-0' :
            buttonState === 'sliding-in' ? 'translate-x-0 opacity-100' :
            buttonState === 'visible' ? 'translate-x-0 opacity-100' : ''
          }`}
          onClick={showInput}
          style={{ 
            transform: buttonState === 'sliding-in' ? 'translateX(0)' : 
                      buttonState === 'sliding-out' ? 'translateX(100%)' : 
                      'translateX(0)'
          }}
        >
          <span className="mr-1">+</span> Add Folder
        </button>
      )}

      {/* Input field with create button */}
      {isInputVisible && (
        <div 
          ref={containerRef}
          className="w-full absolute inset-0 flex items-center space-x-2 bg-white border border-blue-300 rounded p-1 transition-all duration-300 ease-in-out"
          style={{ 
            transform: 'translateX(0)',
            opacity: 1
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder name"
            className="w-3/4 px-2 py-1 outline-none"
          />
          <button
            onClick={CreateFolders}
            disabled={loading}
            className="w-1/4 bg-blue-500 hover:bg-blue-600 text-white px-1 py-1 rounded text-sm"
          >
            {loading?"Creating...":"Create"}
          </button>
        </div>
      )}
    </div>
  );
}