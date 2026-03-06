const express = require("express");

const connectDB = require("./config/db");

const parkingRoutes = require("./routes/parkingRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/parking", parkingRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});