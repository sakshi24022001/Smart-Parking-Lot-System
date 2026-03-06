const ParkingSpot = require("../models/ParkingSpot");

class AllocationService {

  static async findAvailableSpot(vehicleType) {

    const spot = await ParkingSpot.findOne({
      type: vehicleType,
      isAvailable: true
    }).sort({ floor: 1 });

    return spot;

  }

}

module.exports = AllocationService;