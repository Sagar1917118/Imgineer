exports.getAssetInfo=(mimeType, publicUrl)=>{
  const [asset_type, format] = mimeType.split('/');

  // Default thumbnails per type (customize URLs as needed)
  const defaultThumbnails = {
    application: {
      'pdf': 'https://sagar-upload-bucket.s3.ap-south-1.amazonaws.com/thumbnail/pdf.png',
      'vnd.openxmlformats-officedocument.wordprocessingml.document': 'https://sagar-upload-bucket.s3.ap-south-1.amazonaws.com/thumbnail/docx-file.png',
      'vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'https://sagar-upload-bucket.s3.ap-south-1.amazonaws.com/thumbnail/excel.png',
      'vnd.openxmlformats-officedocument.presentationml.presentation': 'https://sagar-upload-bucket.s3.ap-south-1.amazonaws.com/thumbnail/ppt.png',
      'default': 'https://sagar-upload-bucket.s3.ap-south-1.amazonaws.com/thumbnail/folder.png'
    },
    video: 'https://sagar-upload-bucket.s3.ap-south-1.amazonaws.com/thumbnail/youtube.png',
    audio: 'https://sagar-upload-bucket.s3.ap-south-1.amazonaws.com/thumbnail/audio.png',
    text: 'https://sagar-upload-bucket.s3.ap-south-1.amazonaws.com/thumbnail/text.png',
  };

  const result = {
    format,
    asset_type,
  };

  // Add thumbnail logic
  if (asset_type === 'image') {
    result.thumbnailUrl = publicUrl;
  } else if (asset_type === 'application') {
    result.thumbnailUrl =
      defaultThumbnails.application[format] || defaultThumbnails.application['default'];
  } else {
    result.thumbnailUrl = defaultThumbnails[asset_type] || 'https://sagar-upload-bucket.s3.ap-south-1.amazonaws.com/thumbnail/folder.png';
  }

  return result;
}
