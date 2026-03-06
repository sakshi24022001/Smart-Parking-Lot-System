class FeeService {

  static calculateFee(vehicleType, entryTime) {

    const now = new Date();

    const durationMs = now - entryTime;

    const hours = Math.ceil(durationMs / (1000 * 60 * 60));

    let rate = 0;

    switch (vehicleType) {

      case "MOTORCYCLE":
        rate = 10;
        break;

      case "CAR":
        rate = 20;
        break;

      case "BUS":
        rate = 50;
        break;

    }

    return hours * rate;

  }

}

module.exports = FeeService;