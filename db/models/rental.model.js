import mongoose from "mongoose";

const schema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  rentalDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
});

const Rental = mongoose.model("Rental", schema);
export default Rental;
