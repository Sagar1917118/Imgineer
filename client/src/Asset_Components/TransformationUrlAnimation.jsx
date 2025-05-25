import React, { useState, useEffect } from 'react';

const TransformationUrlAnimation = () => {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const animations = [
    '?width=200&height=300',
    '?height=200&grayscale=true',
    '?rotate=90&tint=ffffff',
    '?format=jpeg&quality=90',
    '?brightness=1.5'
  ];

  useEffect(() => {
    const typeText = async (text) => {
      setIsTyping(true);
      setDisplayedText('');
      
      for (let i = 0; i <= text.length; i++) {
        setDisplayedText(text.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setIsTyping(false);
      await new Promise(resolve => setTimeout(resolve, 2000));
    };

    const animateSequence = async () => {
      await typeText(animations[currentAnimation]);
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    };

    animateSequence();
  }, [currentAnimation]);

  return (
      <div className="w-full max-w-4xl">
        {/* Browser Window */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Browser Header */}
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 ml-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Address Bar */}
          <div className="bg-white px-4 py-4 border-b border-gray-200">
            <div className="flex items-center bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              
              <div className="flex-1 font-mono text-lg">
                <span className="text-gray-900">transformation_url</span>
                <span className="text-blue-600 font-semibold">
                  {displayedText}
                  {isTyping && (
                    <span className="animate-pulse text-gray-400">|</span>
                  )}
                </span>
              </div>
              
              <div className="ml-4 flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Browser Content Area */}
        </div>
        
      </div>
  );
};

export default TransformationUrlAnimation;