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
/*router.patch('/train/:id', changeTrain);
router.patch('/station/:id', changeStation);
router.delete('/ride/:id', deleteRide);
router.delete('/train/:id', deleteTrain);
router.delete('/station/:id', deleteStation);
router.post('/ride', addRide);
router.post('/station', addStation);
router.post('/train', addTrain);*/

module.exports = router;
