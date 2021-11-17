const express = require('express');
const {
  getRides,
  changeTrain,
  changeStation,
  deleteRide,
  deleteTrain,
  deleteStation,
  addRide,
  addStation,
  addTrain,
} = require('../controllers');

const router = express.Router();

router.get('/rides', getRides);
router.patch('/train/:name', changeTrain);
router.patch('/station/:abbr', changeStation);
router.delete('/ride/:id', deleteRide);
router.delete('/train/:name', deleteTrain);
router.delete('/station/:abbr', deleteStation);
router.post('/ride', addRide);
router.post('/station', addStation);
router.post('/train', addTrain);

module.exports = router;
