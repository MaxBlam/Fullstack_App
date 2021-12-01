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
  const { data } = await dbGetRides();
  res.status(200).json(data);
});

const changeTrain = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const { train } = req.body;
  if (!name || !train) {
    res
      .status(400)
      .send('One or more properties missing: name, accessibility, seats, desc');
    return;
  }
  const { data } = await dbChangeTrain(name, train);
  res.status(200).json(data);
});
const changeStation = asyncHandler(async (req, res) => {
  const { abbr } = req.params;
  const { station } = req.body;
  if (!abbr || !station) {
    res.status(400).send('One or more properties missing: abbr, station');
    return;
  }
  const { data } = await dbChangeStation(abbr, station);
  res.status(200).json(data);
});

const deleteRide = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { data } = await dbGetRide(id);
  if (data.length === 0) {
    res.status(404).send(`Ride ${id} does not exist`);
  } else {
    await dbDeleteRide(id);
    res.status(204).end();
  }
});
const deleteTrain = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const { data } = await dbGetTrain(name);
  if (data.length === 0) {
    res.status(404).send(`Train ${name} does not exist`);
  } else {
    await dbDeleteTrain(name);
    res.status(204).end();
  }
});
const deleteStation = asyncHandler(async (req, res) => {
  const { abbr } = req.params;
  const { data } = await dbGetStation(abbr);
  if (data.length === 0) {
    res.status(404).send(`Station ${abbr} does not exist`);
  } else {
    await dbDeleteStation(abbr);
    res.status(204).end();
  }
});

const addRide = asyncHandler(async (req, res) => {
  const { data } = await dbAddRide(req.body);
  res.status(200).json(data);
});
const addStation = asyncHandler(async (req, res) => {
  const { data } = await dbAddStation(req.body);
  res.status(200).json(data);
});
const addTrain = asyncHandler(async (req, res) => {
  const { data } = await dbAddTrain(req.body);
  res.status(200).json(data);
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
