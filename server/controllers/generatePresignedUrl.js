const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const mime = require('mime-types');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const generatePresignedUrl = async (req, res) => {
  const { filename, fileType } = req.body;

  if (!filename || !fileType) {
    return res.status(400).json({ error: 'Missing filename or fileType' });
  }

  const extension = mime.extension(fileType);
  const key = `assets/${uuidv4()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  try {
    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 180 });
    console.log("I am here at upload url",uploadURL);
    res.json({
      uploadURL,
      key,
      publicUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
};

module.exports = { generatePresignedUrl };
