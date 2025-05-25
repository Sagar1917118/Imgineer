const express =require('express');
const {createFolder,getUserFolders} =require("../controllers/folder");
const {deleteAsset,uploadAssetToFolder,getUserAssets,getAllAssetsByUser} =require("../controllers/assets");
const {verifyToken}=require("../middlewares/verifyToken");
const {checkStorage}=require("../middlewares/checkStorage");
const  {generatePresignedUrl}  = require('../controllers/generatePresignedUrl');
const {getApiKeyByUserId}=require("../controllers/authController");
const { confirmUpload } = require('../controllers/confirmUpload');
const {verifyApiKey}=require("../middlewares/verifyApiKey");
const Router = express.Router();

Router.post('/create_folders',verifyToken,createFolder);
Router.post('/folders/:folderId/assets', uploadAssetToFolder);
Router.get("/get_folders",verifyToken,getUserFolders);
Router.get("/users/:userId/assets",getUserAssets);
Router.delete('/assets/:assetId', deleteAsset);
// Router.post("/users/upload-url",verifyToken,checkStorage,generatePresignedUrl); this one is real
Router.get("/user/api_key",verifyToken,getApiKeyByUserId);

Router.post("/users/upload-url",verifyToken,checkStorage,generatePresignedUrl);
Router.post("/users/notify_upload",verifyToken,confirmUpload);
Router.get("/users/all_assets",verifyToken,getAllAssetsByUser);

// this route if for sdk
Router.post("/sdk/upload_url",checkStorage,verifyApiKey,generatePresignedUrl)
Router.post("/sdk/notify_upload",verifyApiKey,confirmUpload);
// -------------
module.exports = Router;
