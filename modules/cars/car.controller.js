import Car from "../../db/models/car.model.js";

const addCar = async (req, res) => {
  const { name, model } = req.body;

  try {
    const car = new Car({ name, model });
    await car.save();

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarsByModel = async (req, res) => {
  const { model } = req.query;

  try {
    const modelsArray = model.split(",");

    const cars = await Car.find({ model: { $in: modelsArray } });

    if (cars.length === 0) {
      return res
        .status(404)
        .json({ msg: "No cars found for the given models" });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAvailableCarsByModel = async (req, res) => {
  const { model, status } = req.query;

  try {
    const cars = await Car.find({ model, rentalStatus: "available" });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRentedOrSpecificModelCars = async (req, res) => {
  const { model } = req.query;

  try {
    const cars = await Car.find({
      $or: [{ rentalStatus: "rented" }, { model: model }],
    });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAvailableOrRentedCarsByModel = async (req, res) => {
  const { models, status } = req.query;
  const modelsArray = models.split(",");

  try {
    const cars = await Car.find({
      $or: [
        { model: { $in: modelsArray }, rentalStatus: "available" },
        { model: { $in: modelsArray }, rentalStatus: "rented" },
      ],
    });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ msg: "Car not found" });

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCar) return res.status(404).json({ msg: "Car not found" });

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ msg: "Car not found" });

    res.status(200).json({ msg: "Car deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  addCar,
  getAllCars,
  getCarsByModel,
  getCarById,
  updateCar,
  deleteCar,
  getAvailableCarsByModel,
  getRentedOrSpecificModelCars,
  getAvailableOrRentedCarsByModel,
};
