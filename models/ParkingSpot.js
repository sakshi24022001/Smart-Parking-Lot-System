const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
  spotNumber: Number,

  floor: Number,

  type: {
    type: String,
    enum: ["CAR", "BUS", "MOTORCYCLE"]
  },

  isAvailable: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);