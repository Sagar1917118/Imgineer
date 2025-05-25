const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uploadAssetToFolder = async (req, res) => {
  const { folderId } = req.params;
  const {
    name,
    publicUrl,
    thumbnailUrl,
    assetType,
    format,
    size,
  } = req.body;

  try {
    const asset = await prisma.asset.create({
      data: {
        name,
        publicUrl,
        thumbnailUrl,
        assetType,
        format,
        size,
        folder: { connect: { id: folderId } },
      },
    });
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload asset', details: error.message });
  }
};

// DELETE /assets/:assetId
const deleteAsset = async (req, res) => {
  const { assetId } = req.params;

  try {
    await prisma.asset.delete({
      where: { id: assetId },
    });
    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete asset', details: error.message });
  }
};

const getUserAssets = async (req, res) => {
  const { userId } = req.params;

  try {
    const assets = await prisma.asset.findMany({
      where: {
        // Navigate through the Folder relation to filter by user
        folder: { userId },
      },
      include: {
        folder: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Optional: flatten the folder name to a top-level field
    const result = assets.map(a => ({
      id:           a.id,
      name:         a.name,
      publicUrl:    a.publicUrl,
      thumbnailUrl: a.thumbnailUrl,
      assetType:    a.assetType,
      format:       a.format,
      size:         a.size,
      createdAt:    a.createdAt,
      folderId:     a.folderId,
      folderName:   a.folder.name,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch assets', details: error.message });
  }
};

const getAllAssetsByUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    const assets = await prisma.asset.findMany({
      where: { userId },
      include: {
        folder: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    // console.log(assets);
    return res.status(200).json({
      success: true,
      count: assets.length,
      assets: assets.map(asset => {
        const key = asset.key;
        const transfromtransformationUrl = `${process.env.CLOUDFRONT_URL}/${key}`;
        // console.log(transfromtransformationUrl)
        return {
          id: asset.id,
          name: asset.name,
          publicUrl: asset.publicUrl,
          transfromtransformationUrl: transfromtransformationUrl,
          thumbnailUrl: asset.thumbnailUrl,
          folderName: asset?.folder?.name || 'Uncategorized',
          asset_type: asset?.assetType,
          format: asset.format,
          size: parseInt(asset.size / 1024),
          createdAt: asset.createdAt,
        };
      }),
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports={uploadAssetToFolder,deleteAsset,getUserAssets,getAllAssetsByUser}