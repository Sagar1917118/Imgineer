const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../utils/googleClient');
const { generateApiKey } =require("../utils/generateApiKey");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET Google Authentication API. */
const googleAuth = async (req, res, next) => {
    const code = req.query.code;
    try {
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;
        let user = await prisma.user.findUnique({
            where: { email },
            include: {
              apiKey: true,
            },
        });

        if (!user) {
            const apiKeyValue = generateApiKey();
            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    image: picture,
                    apiKey: {
                    create: {
                        key: apiKeyValue,
                        usedSpace: 0,
                    },
                    },
                },
                include: { apiKey: true },
            });
        }
        const { id} = user;
        const apiKey=user?.apiKey?.key;
        const token = jwt.sign({ id, email ,apiKey},
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT,
        });
        user.apiKey=null;
        res.status(200).json({
            message: 'success',
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};
const getApiKeyByUserId = async (req, res) => {
  const { userId } = req.params;
  // console.log(userId);
  try {
    const apiKey = await prisma.apiKey.findUnique({
      where: {
        userId,
      },
    });

    if (!apiKey) {
      return res.status(404).json({ message: 'API key not found for the user.' });
    }

    res.status(200).json(apiKey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve API key', details: error.message });
  }
};

module.exports={googleAuth,getApiKeyByUserId}