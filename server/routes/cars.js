const express = require('express');
const {
  getFahrt,
  deleteCar,
  changeStatusCar,
  addCar,
} = require('../controllers');

const router = express.Router();

router.get('/fahrt', getFahrt);
router.patch('/zug/:id', changeZug);
router.patch('/bahnhof/:id', changeBahnhof);
router.delete('/cars/:id', deleteCar);
router.post('/cars', addCar);

module.exports = router;
