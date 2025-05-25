const { PrismaClient } =require("@prisma/client");
const prisma = new PrismaClient();

export const uploadAssetByUserId = async (req, res) => {
  try {
    const {
      userId,
      folderName,
      name,
      format,
      size,
      asset_type,
      publicUrl,
      thumbnailUrl,
      key
    } = req.body;

    // Find or create folder
    let folder = await prisma.folder.findFirst({
      where: { name: folderName, userId }
    });

    if (!folder) {
      folder = await prisma.folder.create({
        data: {
          name: folderName,
          user: { connect: { id: userId } }
        }
      });
    }

    // Create asset
    const asset = await prisma.asset.create({
      data: {
        name,
        format,
        size,
        asset_type,
        publicUrl,
        thumbnailUrl,
        key,
        folderId: folder.id
      }
    });

    // Update used space in apiKey
    await prisma.apiKey.update({
      where: { userId },
      data: { usedSpace: { increment: size } }
    });

    return res.status(201).json({ message: "Asset uploaded", asset });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to upload asset" });
  }
};
