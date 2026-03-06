const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  vehicleType: {
    type: String,
    enum: ["CAR", "BUS", "MOTORCYCLE"],
    required: true
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);