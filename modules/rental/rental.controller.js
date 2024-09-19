import Rental from "../../db/models/rental.model.js";
import Car from "../../db/models/car.model.js";

const createRental = async (req, res) => {
  const { carId, customerId, rentalDate } = req.body;

  try {
    const car = await Car.findById(carId);
    if (!car || car.rentalStatus === "rented") {
      return res.status(400).json({ msg: "Car not available" });
    }

    const rental = new Rental({ carId, customerId, rentalDate });
    await rental.save();

    car.rentalStatus = "rented";
    await car.save();

    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const returnCar = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ msg: "Rental not found" });

    rental.returnDate = new Date();
    await rental.save();

    const car = await Car.findById(rental.carId);
    car.rentalStatus = "available";
    await car.save();

    res.status(200).json({ msg: "Car returned" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!rental) return res.status(404).json({ msg: "Rental not found" });

    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).json({ msg: "Rental not found" });

    res.status(200).json({ msg: "Rental deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().populate("carId customerId");
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id).populate(
      "carId customerId"
    );
    if (!rental) return res.status(404).json({ msg: "Rental not found" });

    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createRental,
  returnCar,
  updateRental,
  deleteRental,
  getAllRentals,
  getRentalById,
};
