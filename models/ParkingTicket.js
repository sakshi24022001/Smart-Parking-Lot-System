const mongoose = require("mongoose");

const parkingTicketSchema = new mongoose.Schema({

  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle"
  },

  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingSpot"
  },

  entryTime: {
    type: Date,
    default: Date.now
  },

  exitTime: Date,

  fee: Number,

  status: {
    type: String,
    enum: ["ACTIVE", "COMPLETED"],
    default: "ACTIVE"
  }

});

module.exports = mongoose.model("ParkingTicket", parkingTicketSchema);