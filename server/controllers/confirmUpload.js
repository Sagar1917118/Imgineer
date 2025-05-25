const { PrismaClient } =require('@prisma/client');
const prisma = new PrismaClient();
const {getAssetInfo}=require("../utils/getAssetInfo");


const confirmUpload = async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'];
    const {userId}=req.params;
    const { folderId, key, publicUrl, name, size, assetInfo} = req.body;
    if (!userId || !folderId || !key || !publicUrl || !name || !size) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const {thumbnailUrl,asset_type,format}=getAssetInfo(assetInfo,publicUrl);
    console.log(userId,folderId, key, publicUrl, name, size,thumbnailUrl,asset_type,format);
    const asset = await prisma.asset.create({
      data: {
        name,
        publicUrl,
        thumbnailUrl:thumbnailUrl,
        size,
        format,
        key,
        assetType:asset_type,
        folder: { connect: { id: folderId } },
        user:{connect:{id:userId}}
      },
    });
    // update the ised api key
    const sizeInByte = parseInt(size);
    console.log("I am at upading the api key",apiKey,sizeInByte);
     await prisma.apiKey.update({
      where: { key: apiKey },
      data: {
        usedSpace: { increment: sizeInByte },
        requestCount: { increment: 1 },
      },
    });
    res.status(201).json({ message: 'Asset stored', asset });
  } catch (error) {
    console.error('Confirm upload error:', error);
    res.status(500).json({ error: 'Failed to store asset', details: error.message });
  }
};

module.exports={confirmUpload}