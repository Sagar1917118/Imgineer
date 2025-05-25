import axios from "axios";

/**
 * Uploads a file to cloud storage and notifies backend.
 * @param {string} apiKey - The API key (passed via headers).
 * @param {string} folderId - ID of the folder to upload to.
 * @param {File} file - The file object to upload.
 * @param {string} [backendUrl] - The base URL for your backend API (optional)
 * @returns {Promise<string>} - Returns the public URL of the uploaded file.
 */
export async function uploadAsset(apiKey, folderId, file, backendUrl) {
    if (!apiKey || !folderId || !file) {
        throw new Error("Missing required parameters: apiKey, folderId or file.");
    }

    const headers = {
        "x-api-key": apiKey,
    };

    try{
    // 1. Get the pre-signed S3 URL from backend
    const presignRes = await axios.post(
        `${backendUrl}/sdk/upload_url`,
        {
        filename: file.name,
        fileType: file.type,
        fileSize: file.size,
        },
        {
        headers,
        }
    );

    const { uploadURL, key, publicUrl } = presignRes.data;

    // 2. Upload the file to the signed S3 URL
    await axios.put(uploadURL, file, {
        headers: {
        "Content-Type": file.type,
        },
    });

    // 3. Notify backend about the new file
    await axios.post(
        `${backendUrl}/sdk/notify_upload`,
        {
        name: file.name,
        key: key,
        publicUrl: publicUrl,
        size: file.size,
        folderId: folderId,
        assetInfo: file.type,
        },
        {
        headers,
        }
    );

    return publicUrl;
    }catch(err){
        throw new Error("Error in uploading asset with SDKs",err.message);
    }
}
