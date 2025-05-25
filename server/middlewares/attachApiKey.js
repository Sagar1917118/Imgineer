const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const attachApiKey = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required in request parameters.' });
    }

    const apiKeyRecord = await prisma.apiKey.findFirst({
      where: {
        userId: userId,
        enabled: true,
      },
    });

    if (!apiKeyRecord) {
      return res.status(404).json({ error: 'Enabled API key not found for this user.' });
    }

    // Attach API key to request headers
    req.headers['x-api-key'] = apiKeyRecord.key;

    next();
  } catch (err) {
    console.error('attachApiKey middleware error:', err);
    res.status(500).json({ error: 'Internal server error while attaching API key.' });
  }
};

module.exports = {attachApiKey};
