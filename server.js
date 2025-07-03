const express = require("express");
const connectToDb = require("./config/connectToDb");
require("dotenv").config();
const Vehicle = require("./models/vehicle");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

connectToDb();

// Routes
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.post("/api/lookup", async (req, res) => {
  const { vin } = req.body;
  const response = await axios.get(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesExtended/{VIN}?format=json`
  );
  const data = response.data.Results[0];

  const make = data.Make || "unknown";
  const model = data.Model || "unknown";
  const year = data.ModelYear;

  const newVehicle = new Vehicle({ vin, make, model, year });
  await newVehicle.save();

  res.json(newVehicle);
});

app.get("/api/history", async (Req, res) => {
  const vehicles = await Vehicle.find().sort({ createdAt: -1 });
  res.json(vehicles);
});

app.listen(process.env.PORT);
