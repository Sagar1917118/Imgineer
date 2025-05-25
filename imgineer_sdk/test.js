// test.js
const { uploadAsset } = require("./index");

uploadAsset({
  filePath: "./sample.jpg",
  apiKey: "your-api-key",
  uploadUrl: "https://your-api.com/upload"
})
  .then(console.log)
  .catch(console.error);
