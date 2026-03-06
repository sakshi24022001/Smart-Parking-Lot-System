const Vehicle = require("../models/Vehicle");
const ParkingSpot = require("../models/ParkingSpot");
const ParkingTicket = require("../models/ParkingTicket");

const AllocationService = require("../services/allocationService");
const FeeService = require("../services/feeService");

exports.parkVehicle = async (req, res) => {

  const { vehicleNumber, vehicleType } = req.body;

  try {

    let vehicle = await Vehicle.findOne({ vehicleNumber });

    if (!vehicle) {
      vehicle = await Vehicle.create({ vehicleNumber, vehicleType });
    }

    const spot = await AllocationService.findAvailableSpot(vehicleType);

    if (!spot)
      return res.json({ message: "Parking Full" });

    spot.isAvailable = false;
    await spot.save();

    const ticket = await ParkingTicket.create({
      vehicle: vehicle._id,
      spot: spot._id
    });

    res.json({
      message: "Vehicle Parked",
      ticket
    });

  } catch (error) {
    res.status(500).json(error);
  }

};

exports.exitVehicle = async (req, res) => {

  const { vehicleNumber } = req.body;

  try {

    const vehicle = await Vehicle.findOne({ vehicleNumber });

    const ticket = await ParkingTicket
      .findOne({ vehicle: vehicle._id, status: "ACTIVE" })
      .populate("spot");

    const fee = FeeService.calculateFee(
      vehicle.vehicleType,
      ticket.entryTime
    );

    ticket.exitTime = new Date();
    ticket.fee = fee;
    ticket.status = "COMPLETED";

    await ticket.save();

    ticket.spot.isAvailable = true;
    await ticket.spot.save();

    res.json({
      message: "Vehicle Exit",
      fee
    });

  } catch (error) {
    res.status(500).json(error);
  }

};