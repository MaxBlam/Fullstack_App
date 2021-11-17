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

const getRides = asyncHandler(async (req, res) => {
  const { code, result } = await dbGetRides();
  res.status(code).json(result);
});

const changeTrain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;
  const { code, result } = await dbChangeTrain(id, desc);
  res.status(code).json(result);
});
const changeStation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { station } = req.body;
  const { code, result } = await dbChangeStation(id, station);
  res.status(code).json(result);
});

const deleteRide = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { code, result } = await dbDeleteRide(id);
  res.status(code).json(result);
});
const deleteTrain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { code, result } = await dbDeleteTrain(id);
  res.status(code).json(result);
});
const deleteStation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { code, result } = await dbDeleteStation(id);
  res.status(code).json(result);
});

const addRide = asyncHandler(async (req, res) => {
  const { code, result } = await dbAddRide(req.body);
  res.status(code).json(result);
});
const addStation = asyncHandler(async (req, res) => {
  const { code, result } = await dbAddStation(req.body);
  res.status(code).json(result);
});
const addTrain = asyncHandler(async (req, res) => {
  const { code, result } = await dbAddTrain(req.body);
  res.status(code).json(result);
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
