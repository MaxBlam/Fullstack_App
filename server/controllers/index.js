const asyncHandler = require('express-async-handler');
const {
  dbGetRides,
  dbGetRide,
  dbGetTrain,
  dbGetStation,
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
  if (!id || !desc) {
    res.status(400).send('One or more properties missing: id, desc');
    return;
  }
  const { code, result } = await dbChangeTrain(id, desc);
  res.status(code).json(result);
});
const changeStation = asyncHandler(async (req, res) => {
  const { abbr } = req.params;
  const { station } = req.body;
  if (!abbr || !station) {
    res.status(400).send('One or more properties missing: abbr, station');
    return;
  }
  const { code, result } = await dbChangeStation(abbr, station);
  res.status(code).json(result);
});

const deleteRide = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rows = dbGetRide(id);
  if (rows.length === 0) {
    res.status(404).send(`Ride ${id} does not exist`);
    return;
  } else {
    await dbDeleteRide(id);
    res.status(204).end();
  }
});
const deleteTrain = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const rows = dbGetTrain(name);
  if (rows.length === 0) {
    res.status(404).send(`Train ${name} does not exist`);
    return;
  } else {
    await dbDeleteTrain(name);
    res.status(204).end();
  }
});
const deleteStation = asyncHandler(async (req, res) => {
  const { abbr } = req.params;
  const rows = dbGetStation(abbr);
  if (rows.length === 0) {
    res.status(404).send(`Station ${abbr} does not exist`);
    return;
  } else {
    await dbDeleteStation(abbr);
    res.status(204).end();
  }
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
