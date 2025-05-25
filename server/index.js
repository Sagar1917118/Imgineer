const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const assetRoutes=require("./routes/assetRouter");
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use('/auth/', authRoutes);
app.use("/",assetRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})