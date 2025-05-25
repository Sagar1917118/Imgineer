import React from 'react';
import fit_options from "../icons/fit_options.png"
import br1 from "../icons/brightness05.png";
import br2 from "../icons/brightness01.png";
import br3 from "../icons/brightness2.png";
import gs1 from "../icons/gs1.png";
import gs2 from "../icons/gs2.png";
import tint1 from "../icons/tint_1.png";
import tint2 from "../icons/tint_white.png"
import tint3 from "../icons/tint_000000.png"
import tint4 from "../icons/tint_ff0000.png"
import tint5 from "../icons/tint_00ff00.png"
import tint6 from "../icons/tint_0000ff.png"
import tint7 from "../icons/tint_ffff00.png"
import tint8 from "../icons/tint_00ffff.png"
import tint9 from "../icons/tint_ff00ff.png"
import tint10 from "../icons/tint_808080.png"
import tint11 from "../icons/tint_ffa500.png"
import TransformationUrlAnimation from './TransformationUrlAnimation';
const COMMON_COLORS = [
  { hex: 'ffffff', name: 'White' },
  { hex: '000000', name: 'Black' },
  { hex: 'ff0000', name: 'Red' },
  { hex: '00ff00', name: 'Green' },
  { hex: '0000ff', name: 'Blue' },
  { hex: 'ffff00', name: 'Yellow' },
  { hex: '00ffff', name: 'Cyan' },
  { hex: 'ff00ff', name: 'Magenta' },
  { hex: '808080', name: 'Gray' },
  { hex: 'ffa500', name: 'Orange' }
];

const FitOperationsCard = () => {
  const fitOperations = [
    {
      name: 'cover',
      description: 'Preserves aspect ratio, attempt to ensure the image covers both provided dimensions by cropping/clipping to fit.',
    },
    {
      name: 'contain',
      description: 'Preserves aspect ratio, contain within both provided dimensions using "letterboxing" where necessary.',
    },
    {
      name: 'fill',
      description: 'Ignore the aspect ratio of the input and stretch to both provided dimensions.',
    },
    {
      name: 'inside',
      description: 'Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.',
    },
    {
      name: 'outside',
      description: 'Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.',
    }
  ];

  return (
    <div className="mt-2 w-full mx-auto">

      <div className="space-y-6">
        {fitOperations.map((op, index) => (
          <div key={index} className={`pb-5 ${index < fitOperations.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div className="flex items-center mb-2">
              <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">{op.name}</span>
              {op.name === 'cover' && (
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">default</span>
              )}
              <p className="text-gray-800 font-medium mb-1">{op.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ColorTintExample = ({ color }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-around items-center">
      <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint1}></img>
        <span className="text-xs mt-1">original</span>
      </div>
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint2}></img>
        <span className="text-xs mt-1">?tint=ffffff</span>
      </div>
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint3}></img>
        <span className="text-xs mt-1">?tint=000000</span>
      </div>
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint4}></img>
        <span className="text-xs mt-1">?tint=ff0000</span>
      </div>
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint5}></img>
        <span className="text-xs mt-1">?tint=00ff00</span>
      </div>
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint6}></img>
        <span className="text-xs mt-1">?tint=0000ff</span>
      </div>
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint7}></img>
        <span className="text-xs mt-1">?tint=ffff00</span>
      </div>
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint8}></img>
        <span className="text-xs mt-1">?tint=00ffff</span>
      </div>
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint9}></img>
        <span className="text-xs mt-1">?tint=ff00ff</span>
      </div> <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint10}></img>
        <span className="text-xs mt-1">?tint=808080</span>
      </div>
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={tint11}></img>
        <span className="text-xs mt-1">?tint=ffa500</span>
      </div>
    </div>
  );
};

const RotateExample = ({ degrees }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-gray-100 border border-gray-300 flex items-center justify-center mb-1">
        <div 
          className="w-12 h-8 bg-blue-500 flex items-center justify-center relative"
          style={{ transform: `rotate(${degrees}deg)` }}
        >
          <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
      <span className="text-xs">{degrees}°</span>
    </div>
  );
};

const GrayscaleExample = () => {
  return (
    <div className="flex gap-4 justify-center">
       <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={gs1}></img>
        <span className="text-xs mt-1">original</span>
      </div>
      <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={gs2}></img>
        <span className="text-xs mt-1">?grayscale=true</span>
      </div>
    </div>
  );
};

const BrightnessExample = () => {
  return (
    <div className="flex gap-4 justify-center">
      <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={br1}></img>
        <span className="text-xs mt-1">?brightness=0.5</span>
      </div>
      <div className="flex flex-col items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={br2}></img>
        <span className="text-xs mt-1">?brightness=1.0</span>
      </div>
      <div className="flex flex-col  border-black items-center">
        <img className="w-44 rounded-lg border-2 border-black" src={br3}></img>
        <span className="text-xs mt-1">?brightness=1.5</span>
      </div>
    </div>
  );
};

const operations = [
  {
    name: 'Width',
    param: 'width',
    example: '?width=300',
    description: 'Specifies the width of the image in pixels.'
  },
  {
    name: 'Height',
    param: 'height',
    example: '?height=200',
    description: 'Specifies the height of the image in pixels.'
  },
   {
    name: 'Format',
    param: 'format',
    values: ['auto', 'jpeg', 'webp', 'avif', 'png', 'svg', 'gif'],
    example: '?format=webp',
    description: 'Specifies the output image format. "auto" chooses the best format based on the browser\'s Accept header.'
  },
  {
    name: 'Quality',
    param: 'quality',
    example: '?quality=80',
    description: 'Specifies the compression quality of the image (1-100).'  
  },
  {
    name: 'Grayscale',
    param: 'grayscale',
    example: '?grayscale=true',
    description: 'Applies a grayscale filter to the image.',
    hasExample: true,
    exampleType: 'grayscale'
  },
  {
    name: 'Brightness',
    param: 'brightness',
    example: '?brightness=1.5',
    hasExample:true,
    exampleType:'brightness',
    description: 'Adjusts the brightness (0-2). 1 is normal brightness.'
  },
  {
    name: 'Tint',
    param: 'tint',
    example: '?tint=ff0000',
    values: ['ffffff','000000','ff0000','00ff00','0000ff','ffff00','00ffff','ff00ff','808080','ffa500'],
    description: 'Applies a color overlay using a hex code (e.g., ff0000 for red).',
    hasExample: true,
    exampleType: 'tint'
  },
  {
    name: 'Fit',
    param: 'fit',
    values: ['cover', 'contain', 'fill', 'inside', 'outside'],
    example: '?fit=cover',
    description: 'Determines how the image should fit within the given width and height.',
    hasExample: true,
    exampleType: 'fit',
    detailedDescription: 'The fit parameter controls how the image is resized to fit the target dimensions:',
    fitDetails: [
      { mode: 'cover', desc: 'Preserves aspect ratio, covers both dimensions by cropping/clipping' },
      { mode: 'contain', desc: 'Preserves aspect ratio, contains within both dimensions using "letterboxing" if needed' },
      { mode: 'fill', desc: 'Ignores aspect ratio and stretches to both dimensions' },
      { mode: 'inside', desc: 'Preserves aspect ratio, resizes to be as large as possible while fitting within dimensions' },
      { mode: 'outside', desc: 'Preserves aspect ratio, resizes to be as small as possible while covering dimensions' }
    ]
  },
  {
    name: 'Rotate',
    param: 'rotate',
    values: ['0', '90', '180', '270'],
    example: '?rotate=90',
    description: 'Rotates the image by a multiple of 90 degrees.',
    hasExample: true,
    exampleType: 'rotate'
  },
];
export default function ImageOperationDocumentation() {
  return (
    <div className="p-6 overflow-y-scroll max-w-11/12 mx-auto bg-slate-50">
      <div className="flex flex-col items-center bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-6 mb-8 shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center">Image Processing Options</h1>
        <p className="mt-2 text-indigo-100 text-center">
          Comprehensive guide to image transformation parameters
        </p>
         <TransformationUrlAnimation></TransformationUrlAnimation>
      </div>

      {/* Main Grid of Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {operations.map((op, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-xl">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">{op.name}</h2>
              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-mono">
                {op.param}
              </span>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-700">{op.description}</p>
              
              {op.values && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Valid Values:</p>
                  <div className="flex flex-wrap gap-2">
                    {op.values.map(val => (
                      <span key={val} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Example:</p>
                <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm block">{op.example}</code>
              </div>
              
              {/* Examples for specific parameter types */}
              {op.hasExample && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Visual Example:</p>
                  
                  {op.exampleType === 'grayscale' && <GrayscaleExample />}
                  {op.exampleType ==='brightness' && <BrightnessExample/>}
                  
                  {op.exampleType === 'tint' && (
                    <ColorTintExample/>
                  )}
                  
                  {op.exampleType === 'rotate' && (
                    <div className="flex justify-around">
                      {[0, 90, 180, 270].map(deg => (
                        <RotateExample key={deg} degrees={deg} />
                      ))}
                    </div>
                  )}
                  {op.exampleType==='fit' &&(
                    <div>
                        <img src={fit_options}></img>
                        <FitOperationsCard/>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Combined URL Examples */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Combined Examples</h2>
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">Responsive Image with WebP Format:</p>
            <code className="bg-gray-100 text-gray-800 px-3 py-2 rounded text-sm block">
              /images/photo.jpg?width=800&format=webp&quality=85
            </code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">Cropped Thumbnail:</p>
            <code className="bg-gray-100 text-gray-800 px-3 py-2 rounded text-sm block">
              /images/profile.jpg?width=150&height=150&fit=cover&position=top
            </code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">Stylized Image:</p>
            <code className="bg-gray-100 text-gray-800 px-3 py-2 rounded text-sm block">
              /images/landscape.jpg?width=1200&brightness=1.2&tint=0000ff&quality=90
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}