import { useState } from "react";
import { FolderIcon, CopyIcon, ImageIcon, ClipboardCopyIcon } from 'lucide-react';

export default function AssetRow({ asset, isSelected, toggleSelect }) {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };


  // format the format of asset
  function getLastPartOfFormat(format) {
  if (!format || typeof format !== "string") return null;

  const parts = format.split(".");
  return parts[parts.length - 1];
}
  return (
    <div
      className={`grid grid-cols-8 gap-4 py-2 px-4 border-b border-gray-200 items-center hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
      onClick={() => toggleSelect(asset.id)}
    >
      {/* Checkbox and Thumbnail */}
      <div className="col-span-1 flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelect(asset.id)}
          className="mr-3"
        />
        <img
          src={asset.thumbnailUrl}
          alt={asset.name}
          className="w-12 h-10 object-cover rounded"
        />
      </div>

      {/* Display Name with Copy */}
      <div className="col-span-1 relative flex items-center group">
        <span className="truncate max-w-[120px]">{asset.name}</span>
        <button
          onClick={(e) => handleCopy(e, asset.name)}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200"
          title="Copy asset name"
        >
          <CopyIcon size={14} />
        </button>

        {showCopied && (
          <div className="absolute top-0 right-0 transform translate-x-full -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded">
            Copied!
          </div>
        )}
      </div>

      {/* Folder */}
      <div className="col-span-1 flex items-center">
        <FolderIcon size={14} className="mr-1 text-gray-500" />
        {asset.folderName}
      </div>

      {/* Type */}
      <div className="col-span-1">{asset.asset_type}</div>

      {/* Format */}
      <div className="col-span-1 flex items-center">
        <div className="mr-2 w-4 h-4 flex items-center justify-center">
          <ImageIcon size={14} />
        </div>
        {getLastPartOfFormat(asset.format)
        }
      </div>

      {/* Size */}
      <div className="col-span-1">{asset.size}</div>

      {/* Public URL with Copy */}
     <div className="col-span-2 space-y-1">
        {/* Public URL section */}
        <div className="flex items-center justify-between group relative">
          <span
            className="truncate text-sm text-blue-600 underline cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              window.open(asset.publicUrl, '_blank');
            }}
          >
            {asset.publicUrl}
          </span>
          <button
            onClick={(e) => handleCopy(e, asset.publicUrl)}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200"
            title="Copy public URL"
          >
            <ClipboardCopyIcon size={14} />
          </button>
        </div>

        {/* Transformation URL section */}
        <div className="flex items-center justify-between group relative">
          <span
            className="truncate  text-sm text-green-600 underline cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              window.open(asset.transfromtransformationUrl, '_blank');
            }}
          >
            {asset.transfromtransformationUrl}
          </span>
          <button
            onClick={(e) => handleCopy(e, asset.transfromtransformationUrl)}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200"
            title="Copy transformation URL"
          >
            <ClipboardCopyIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
