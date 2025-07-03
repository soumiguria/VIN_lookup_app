const { default: mongoose } = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vin: String,
  make: String,
  model: String,
  year: Number,
  createdAt: { type: Date, default: Date.now },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
