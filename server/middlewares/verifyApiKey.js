// middlewares/validateApiKey.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyApiKey(req, res, next) {
    
  const apiKey = req.headers['x-api-key'];
  console.log("I am at upload backend",apiKey)

  if (!apiKey) {
    return res.status(400).json({ error: "API key is required in query parameters" });
  }

  try {
    const keyRecord = await prisma.apiKey.findUnique({
      where: {
        key: apiKey
      },
      include: {
        user: true
      }
    });

    if (!keyRecord || !keyRecord.enabled) {
      return res.status(403).json({ error: "Invalid or disabled API key" });
    }

    // Inject userId into request for downstream usage
    req.params.userId = keyRecord.userId;


    next();
  } catch (err) {
    console.error("Error validating API key:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {verifyApiKey};
