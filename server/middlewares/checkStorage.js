const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Define maximum allowed storage (in bytes), example: 500MB
const MAX_SPACE = 1024 * 1024 * 1024;

const checkStorage = async (req, res, next) => {
  try {
    // const {apiKey} =req.params; 
    // const {apiKey}=req.query;
    const apiKey = req.headers['x-api-key']; 
    const {fileSize } = req.body;
    console.log(apiKey,fileSize);
    if (!apiKey || !fileSize) {
      return res.status(400).json({ error: 'userId, apiKey, and fileSize are required.' });
    }

    const keyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
    });

    if (!keyRecord) {
      return res.status(404).json({ error: 'API key not found.' });
    }


    if (!keyRecord.enabled) {
      return res.status(403).json({ error: 'API key is disabled.' });
    }

    const availableSpace = MAX_SPACE - keyRecord.usedSpace;

    if (fileSize > availableSpace) {
      return res.status(403).json({ error: 'Insufficient storage space.' });
    }

    // Pass check, proceed to next middleware/controller
    next();
  } catch (err) {
    console.error('checkStorage error:', err.message);
    res.status(500).json({ error: 'Server error while checking API key or storage.' });
  }
};

module.exports = {checkStorage};
