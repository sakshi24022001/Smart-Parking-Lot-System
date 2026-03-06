const express = require("express");

const router = express.Router();

const parkingController = require("../controllers/parkingController");

router.post("/park", parkingController.parkVehicle);

router.post("/exit", parkingController.exitVehicle);

module.exports = router;