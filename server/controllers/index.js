const asyncHandler = require('express-async-handler');
const {
  dbGetRides,
  dbChangeTrain,
  dbChangeStation,
  dbDeleteRide,
  dbDeleteTrain,
  dbDeleteStation,
  dbAddRide,
  dbAddStation,
  dbAddTrain,
} = require('../model');

const getCars = asyncHandler(async (req, res) => {
  const result = await dbGetCars();
  res.status(result.code).json(result);
});

const changeStatusCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await dbChangeStatusCar(id, status);
  res.status(result.code).json(result);
});

const deleteCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await dbDeleteCar(id);
  res.status(result.code).json(result);
});

const addCar = asyncHandler(async (req, res) => {
  const result = await dbAddCar(req.body);
  res.status(result.code).json(result);
});

module.exports = {
  getRides,
  changeTrain,
  changeStation,
  deleteRide,
  deleteTrain,
  deleteStation,
  addRide,
  addStation,
  addTrain,
};
