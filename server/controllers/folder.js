// POST /folders
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const createFolder = async (req, res) => {
    const {userId}=req.params;
  const { folderName } = req.body;
  console.log(req);

  try {
    await prisma.folder.create({
      data: {
        name:folderName,
        user: { connect: { id: userId } },
      },
    });
    const folder = await prisma.folder.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create folder', details: error.message });
  }
};

const getUserFolders = async (req,res) => {
  const { userId } = req.params;

  try {
    const folders = await prisma.folder.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(folders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch folders', details: error.message });
  }
};

module.exports={getUserFolders,createFolder};
