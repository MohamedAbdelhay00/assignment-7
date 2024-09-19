import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  rentalStatus: {
    type: String,
    enum: ["available", "rented"],
    default: "available",
  },
});

const Car = mongoose.model("Car", schema);
export default Car;
